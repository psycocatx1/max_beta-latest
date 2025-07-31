import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService, LocalItemDescription, Prisma } from "@lib/prisma";
import {
  CreateLocalItemDescriptionDto,
  UpdateLocalItemDescriptionDto,
} from "../dto";
import { FilesService } from "src/files/files.service";
import { images_paths } from "src/files/allowed-models.data";
import { CrudService as LocalProductCrudService } from "src/products-section/local-products/services";
import { CrudService as LocalServiceCrudService } from "src/services-section/local-services/services";

/**
 * Сервис для CRUD операций над описаниями объектов
 */
@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
    private readonly localProductService: LocalProductCrudService,
    private readonly localServiceService: LocalServiceCrudService,
  ) {}

  /**
   * Константы для управления порядком
   */
  private readonly REINDEX_THRESHOLD = 0.01; // Порог для запуска реиндексации

  /**
   * Сохраняет изображение для описания типа IMAGE
   * @param data - данные для создания или обновления описания объекта
   * @param file - файл изображения
   * @param existingDescription - существующее описание объекта
   */
  private saveImage(
    data: CreateLocalItemDescriptionDto | UpdateLocalItemDescriptionDto,
    file: Express.Multer.File,
    existingDescription?: LocalItemDescription,
  ) {
    if (!this.filesService.isValidImage(file))
      throw new Error(
        "Недопустимый формат файла. Разрешены только JPEG, PNG и WebP",
      );
    if (!this.filesService.isValidSize(file, 5))
      throw new Error("Размер файла не должен превышать 5 МБ");
    if (existingDescription?.content && existingDescription.type === "IMAGE") {
      this.filesService.deleteImage(existingDescription.content);
    }
    data.content = this.filesService.saveImage(
      file,
      images_paths.local_item_descriptions,
    );
  }

  /**
   * Получает максимальный порядок для описаний конкретного объекта
   */
  private async getMaxOrder(
    local_product_id?: string,
    local_service_id?: string,
  ): Promise<number> {
    const maxOrderResult = await this.prisma.localItemDescription.findFirst({
      where: {
        local_product_id,
        local_service_id,
        is_excluded: false,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    return maxOrderResult?.order || 0;
  }

  /**
   * Вычисляет новый порядок для обновления существующего элемента
   */
  private async calculateNewOrderForUpdate(
    currentId: string,
    targetOrder: number,
    local_product_id?: string | null,
    local_service_id?: string | null,
  ): Promise<number> {
    // Получаем все описания кроме текущего, отсортированные по order
    const allDescriptions = await this.prisma.localItemDescription.findMany({
      where: {
        local_product_id: local_product_id || undefined,
        local_service_id: local_service_id || undefined,
        is_excluded: false,
        id: { not: currentId }, // Исключаем текущий элемент
      },
      orderBy: { order: "asc" },
      select: { id: true, order: true },
    });
    // Если нет других элементов, просто возвращаем целевой порядок
    if (allDescriptions.length === 0) {
      return targetOrder;
    }
    // Если целевой порядок меньше первого элемента - помещаем в начало
    if (targetOrder < allDescriptions[0].order) {
      return allDescriptions[0].order - 1.0;
    }
    // Если целевой порядок больше последнего элемента - помещаем в конец
    if (targetOrder > allDescriptions[allDescriptions.length - 1].order) {
      return allDescriptions[allDescriptions.length - 1].order + 1.0;
    }
    // Ищем позицию для вставки между элементами
    for (let i = 0; i < allDescriptions.length - 1; i++) {
      const currentOrder = allDescriptions[i].order;
      const nextOrder = allDescriptions[i + 1].order;
      if (targetOrder >= currentOrder && targetOrder <= nextOrder) {
        return (currentOrder + nextOrder) / 2;
      }
    }
    // Если не нашли подходящую позицию, возвращаем целевой порядок
    return targetOrder;
  }

  /**
   * Проверяет, нужна ли реиндексация на основе минимальной разности между order
   */
  private async checkNeedsReindexing(
    local_product_id?: string,
    local_service_id?: string,
  ): Promise<boolean> {
    const descriptions = await this.prisma.localItemDescription.findMany({
      where: {
        local_product_id,
        local_service_id,
        is_excluded: false,
      },
      orderBy: { order: "asc" },
      select: { order: true },
    });

    if (descriptions.length < 2) return false;

    for (let i = 1; i < descriptions.length; i++) {
      const diff = descriptions[i].order - descriptions[i - 1].order;
      if (diff < this.REINDEX_THRESHOLD) {
        return true;
      }
    }

    return false;
  }

  /**
   * Реиндексирует описания для конкретного объекта (продукта или сервиса)
   * @param local_product_id - ID локального продукта
   * @param local_service_id - ID локального сервиса
   */
  async reindexDescriptions(
    local_product_id?: string,
    local_service_id?: string,
  ): Promise<void> {
    if (!local_product_id && !local_service_id) {
      throw new BadRequestException(
        "Необходимо указать либо local_product_id, либо local_service_id",
      );
    }

    const descriptions = await this.prisma.localItemDescription.findMany({
      where: {
        local_product_id,
        local_service_id,
        is_excluded: false,
      },
      orderBy: { order: "asc" },
    });

    // Переиндексируем с шагом 1.0
    const updatePromises = descriptions.map((description, index) =>
      this.prisma.localItemDescription.update({
        where: { id: description.id },
        data: { order: (index + 1) * 1.0 },
      }),
    );

    await Promise.all(updatePromises);
  }

  /**
   * Создание описания объекта
   * @param data - данные для создания описания объекта (CreateLocalItemDescriptionDto)
   * @returns созданное описание объекта (LocalItemDescription)
   */
  async create(
    data: CreateLocalItemDescriptionDto,
    file?: Express.Multer.File,
  ): Promise<LocalItemDescription> {
    if (!data.local_product_id && !data.local_service_id)
      throw new BadRequestException(
        "Необходимо указать либо local_product_id, либо local_service_id",
      );
    if (data.local_product_id && data.local_service_id)
      throw new BadRequestException(
        "Нельзя указывать одновременно local_product_id и local_service_id",
      );
    if (data.type === "IMAGE") {
      if (file) {
        this.saveImage(data, file);
      } else if (!data.content) {
        throw new BadRequestException(
          "Для типа IMAGE необходимо загрузить файл изображения или указать URL",
        );
      }
    } else if (data.type === "TEXT" && !data.content) {
      throw new BadRequestException("Для типа TEXT необходимо указать content");
    }
    if (data.local_product_id)
      await this.localProductService.findOne(data.local_product_id);
    if (data.local_service_id)
      await this.localServiceService.findOne(data.local_service_id);
    const maxOrder = await this.getMaxOrder(
      data.local_product_id,
      data.local_service_id,
    );
    return await this.prisma.localItemDescription.create({
      data: { ...data, content: data.content, order: maxOrder + 1.0 },
    });
  }
  /**
   * Получение описания объекта
   * @param id - id описания объекта
   * @returns описание объекта (LocalItemDescription)
   */
  async findOne(id: string): Promise<LocalItemDescription> {
    const description = await this.prisma.localItemDescription.findUnique({
      where: { id },
      include: {
        local_product: {
          include: {
            product: true,
            locale: true,
          },
        },
        local_service: {
          include: {
            service: true,
            locale: true,
          },
        },
      },
    });
    if (!description)
      throw new NotFoundException("LocalItemDescription not found");
    return description;
  }

  /**
   * Обновление описания объекта
   * @param id - id описания объекта
   * @param data - данные для обновления описания объекта (UpdateLocalItemDescriptionDto)
   * @returns обновленное описание объекта (LocalItemDescription) | null
   */
  async update(
    id: string,
    data: UpdateLocalItemDescriptionDto,
    file?: Express.Multer.File,
  ): Promise<LocalItemDescription> {
    const existingDescription = await this.findOne(id);
    // Проверяем, что не указаны одновременно local_product_id и local_service_id
    if (data.local_product_id && data.local_service_id) {
      throw new BadRequestException(
        "Нельзя указывать одновременно local_product_id и local_service_id",
      );
    }
    if (data.type === "IMAGE" && file)
      this.saveImage(data, file, existingDescription);
    if (data.local_product_id)
      await this.localProductService.findOne(data.local_product_id);
    if (data.local_service_id)
      await this.localServiceService.findOne(data.local_service_id);

    // Обработка изменения порядка
    let finalOrder = existingDescription.order;
    if (data.order !== undefined && data.order !== existingDescription.order) {
      finalOrder = await this.calculateNewOrderForUpdate(
        id,
        data.order,
        existingDescription.local_product_id,
        existingDescription.local_service_id,
      );
    }

    // Создаем чистый объект данных, исключая методы и другие нежелательные свойства
    const updateData: Prisma.LocalItemDescriptionUpdateInput = {};

    // Копируем только допустимые поля
    if (data.content !== undefined) updateData.content = data.content;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.local_product_id !== undefined)
      updateData.local_product = { connect: { id: data.local_product_id } };
    if (data.local_service_id !== undefined)
      updateData.local_service = { connect: { id: data.local_service_id } };
    if (data.is_excluded !== undefined)
      updateData.is_excluded = data.is_excluded;

    // Всегда устанавливаем order
    updateData.order = finalOrder;

    const updatedDescription = await this.prisma.localItemDescription.update({
      where: { id },
      data: updateData,
      include: {
        local_product: {
          include: {
            product: true,
            locale: true,
          },
        },
        local_service: {
          include: {
            service: true,
            locale: true,
          },
        },
      },
    });

    // Проверяем, нужна ли реиндексация после обновления порядка
    if (data.order !== undefined && data.order !== existingDescription.order) {
      const needsReindexing = await this.checkNeedsReindexing(
        existingDescription.local_product_id || undefined,
        existingDescription.local_service_id || undefined,
      );
      if (needsReindexing) {
        await this.reindexDescriptions(
          existingDescription.local_product_id || undefined,
          existingDescription.local_service_id || undefined,
        );
        // Возвращаем обновленное описание после реиндексации
        return this.findOne(id);
      }
    }

    return updatedDescription;
  }
  /**
   * Удаление описания объекта
   * @param id - id описания объекта
   * @returns удаленное описание объекта (LocalItemDescription) | null
   */
  async delete(id: string): Promise<LocalItemDescription> {
    await this.findOne(id);
    return this.prisma.localItemDescription.update({
      where: { id },
      data: { is_excluded: true },
    });
  }
}
