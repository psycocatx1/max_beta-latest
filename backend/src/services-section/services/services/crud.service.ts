import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService, Service, Prisma } from "@lib/prisma";
import { CreateServiceDto, UpdateServiceDto } from "../dto";
import { ExtendedService } from "../example.data";
import { FilesService } from "src/files/files.service";
import { images_paths } from "src/files/allowed-models.data";
import { CrudService as CategoryCrudService } from "src/categories-section/categories/services/crud.service";
/**
 * Сервис для CRUD операций над услугами
 */
@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
    private readonly categoryService: CategoryCrudService,
  ) { }

  private getInclude(locale_id?: string): Prisma.ServiceInclude {
    return {
      images: true,
      category: true,
      local_services: {
        include: { local_item_descriptions: { orderBy: { order: "asc" }, where: { is_excluded: false } } },
        ...(locale_id && { where: { locale_id } }),
      },
    };
  }

  /**
   * Сохраняет изображение услуги
   * @param data - данные для создания или обновления услуги
   * @param file - файл изображения
   */
  private saveImage(
    data: CreateServiceDto | UpdateServiceDto,
    file: Express.Multer.File,
  ) {
    if (!this.filesService.isValidImage(file))
      throw new Error(
        "Недопустимый формат файла. Разрешены только JPEG, PNG и WebP",
      );
    if (!this.filesService.isValidSize(file, 5))
      throw new Error("Размер файла не должен превышать 5 МБ");
    data.image = this.filesService.saveImage(file, images_paths.services);
  }

  /**
   * Создание услуги
   * @param data - данные для создания услуги (CreateServiceDto)
   * @returns созданная услуга (Service)
   */
  async create(
    data: CreateServiceDto,
    file?: Express.Multer.File,
  ): Promise<Service> {
    if (await this.prisma.service.findUnique({ where: { name: data.name } }))
      throw new BadRequestException("Услуга с таким названием уже существует");
    if (file) this.saveImage(data, file);
    if (!data.image) throw new BadRequestException("Изображение обязательно");
    if (!data.category_id)
      throw new BadRequestException("Категория обязательна");
    // Проверяем, что категория существует и имеет тип SERVICE
    const category = await this.categoryService.findOne(data.category_id);
    if (!category) throw new BadRequestException("Категория не найдена");
    if (category.type !== "SERVICE")
      throw new BadRequestException("Категория должна быть типа SERVICE");

    return await this.prisma.service.create({
      data: { ...data, image: data.image },
      include: this.getInclude(),
    });
  }

  /**
   * Получение услуги с локализацией
   * @param id - id услуги
   * @param locale_id - id локализации
   * @returns услуга с локализацией и изображениями (ServiceWithImagesAndLocalDescription) | null
   */
  async findOne(id: string, locale_id?: string): Promise<ExtendedService> {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: this.getInclude(locale_id),
    });
    if (!service) throw new NotFoundException("Service not found");
    return service as unknown as ExtendedService;
  }

  /**
   * Обновление услуги
   * @param id - id услуги
   * @param data - данные для обновления услуги (UpdateServiceDto)
   * @returns обновленная услуга (Service) | null
   */
  async update(
    id: string,
    data: UpdateServiceDto,
    file?: Express.Multer.File,
  ): Promise<Service> {
    await this.findOne(id);
    if (file) this.saveImage(data, file);
    if (data.category_id) {
      const category = await this.categoryService.findOne(data.category_id);
      if (category.type !== "SERVICE")
        throw new BadRequestException("Категория должна быть типа SERVICE");
    }
    return this.prisma.service.update({ where: { id }, data, include: this.getInclude() });
  }
  /**
   * Удаление услуги
   * @param id - id услуги
   * @returns удаленная услуга (Service) | null
   */
  async delete(id: string): Promise<Service> {
    return (await this.findOne(id)).is_excluded
      ? await this.prisma.service.delete({ where: { id } })
      : await this.update(id, { is_excluded: true });
  }
}
