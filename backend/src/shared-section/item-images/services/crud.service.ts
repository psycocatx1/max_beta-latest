import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService, ItemImage } from "@lib/prisma";
import { CreateItemImageDto, UpdateItemImageDto } from "../dto";
import { FilesService } from "src/files/files.service";
import { images_paths } from "src/files/allowed-models.data";
import { CrudService as ProductsCrudService } from "src/products-section/products/services/crud.service";
import { CrudService as ServicesCrudService } from "src/services-section/services/services/crud.service";

/**
 * Сервис для CRUD операций над картинками объектов
 */
@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
    private readonly productsService: ProductsCrudService,
    private readonly servicesService: ServicesCrudService,
  ) {}

  /**
   * Сохраняет изображение
   * @param data - данные для создания или обновления картинки объекта
   * @param file - файл изображения
   * @param existingItemImage - существующая картинка объекта
   */
  private saveImage(
    data: CreateItemImageDto | UpdateItemImageDto,
    file: Express.Multer.File,
    existingItemImage?: ItemImage,
  ) {
    if (!this.filesService.isValidImage(file))
      throw new Error(
        "Недопустимый формат файла. Разрешены только JPEG, PNG и WebP",
      );
    if (!this.filesService.isValidSize(file, 5))
      throw new Error("Размер файла не должен превышать 5 МБ");
    if (existingItemImage?.image)
      this.filesService.deleteImage(existingItemImage.image);
    data.image = this.filesService.saveImage(file, images_paths.item_images);
  }

  /**
   * Создание картинки объекта
   * @param data - данные для создания картинки объекта (CreateItemImageDto)
   * @returns созданная картинка объекта (ItemImage)
   */
  async create(
    data: CreateItemImageDto,
    file?: Express.Multer.File,
  ): Promise<ItemImage> {
    if (file) this.saveImage(data, file);
    if (!data.image) throw new BadRequestException("Изображение обязательно");
    if (!data.product_id && !data.service_id)
      throw new BadRequestException(
        "Необходимо указать либо product_id, либо service_id",
      );
    if (data.product_id && data.service_id)
      throw new BadRequestException(
        "Нельзя указывать одновременно product_id и service_id",
      );
    if (data.product_id) await this.productsService.findOne(data.product_id);
    if (data.service_id) await this.servicesService.findOne(data.service_id);
    return await this.prisma.itemImage.create({
      data: { ...data, image: data.image },
    });
  }
  /**
   * Получение картинки объекта
   * @param id - id картинки объекта
   * @returns картинка объекта (ItemImage)
   */
  async findOne(id: string): Promise<ItemImage> {
    const itemImage = await this.prisma.itemImage.findUnique({
      where: { id },
      include: {
        product: true,
        service: true,
      },
    });
    if (!itemImage) throw new NotFoundException("ItemImage not found");
    return itemImage;
  }
  /**
   * Обновление картинки объекта
   * @param id - id картинки объекта
   * @param data - данные для обновления картинки объекта (UpdateItemImageDto)
   * @returns обновленная картинка объекта (ItemImage) | null
   */
  async update(
    id: string,
    data: UpdateItemImageDto,
    file?: Express.Multer.File,
  ): Promise<ItemImage> {
    const existingItemImage = await this.findOne(id);
    if (file) this.saveImage(data, file, existingItemImage);
    if (data.product_id && data.service_id)
      throw new BadRequestException(
        "Нельзя указывать одновременно product_id и service_id",
      );
    if (data.product_id) await this.productsService.findOne(data.product_id);
    if (data.service_id) await this.servicesService.findOne(data.service_id);
    return await this.prisma.itemImage.update({
      where: { id },
      data: { ...data, ...existingItemImage },
    });
  }

  /**
   * Удаление картинки объекта
   * @param id - id картинки объекта
   * @returns удаленная картинка объекта (ItemImage) | null
   */
  async delete(id: string): Promise<ItemImage> {
    await this.findOne(id);
    return this.prisma.itemImage.update({
      where: { id },
      data: { is_excluded: true },
    });
  }
}
