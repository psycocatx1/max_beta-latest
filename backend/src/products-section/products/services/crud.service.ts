import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService, Product, Prisma } from "@lib/prisma";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { ExtendedProduct } from "../example.data";
import { FilesService } from "src/files/files.service";
import { images_paths } from "src/files/allowed-models.data";

/**
 * Сервис для CRUD операций над продуктами
 */
@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
  ) { }

  private getInclude(locale_id?: string): Prisma.ProductInclude {
    return {
      images: true,
      category: true,
      local_products: {
        include: { local_item_descriptions: { orderBy: { order: "asc" } } },
        ...(locale_id && { where: { locale_id } }),
      },
    };
  }

  /**
   * Сохраняет изображение продукта
   * @param data - данные для создания или обновления продукта
   * @param file - файл изображения
   * @param existingProduct - существующий продукт
   */
  private saveImage(
    data: CreateProductDto | UpdateProductDto,
    file: Express.Multer.File,
    existingProduct?: Product,
  ) {
    if (!this.filesService.isValidImage(file))
      throw new Error(
        "Недопустимый формат файла. Разрешены только JPEG, PNG и WebP",
      );
    if (!this.filesService.isValidSize(file, 5))
      throw new Error("Размер файла не должен превышать 5 МБ");
    if (existingProduct?.image)
      this.filesService.deleteImage(existingProduct.image);
    data.image = this.filesService.saveImage(file, images_paths.products);
  }

  /**
   * Создание продукта
   * @param data - данные для создания продукта (CreateProductDto)
   * @returns созданный продукт (Product)
   */
  async create(
    data: CreateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    if (await this.prisma.product.findUnique({ where: { name: data.name } }))
      throw new BadRequestException("Продукт с таким названием уже существует");
    if (file) this.saveImage(data, file);
    if (!data.image) throw new BadRequestException("Изображение обязательно");
    if (!data.category_id)
      throw new BadRequestException("Категория обязательна");

    // Проверяем, что категория существует и имеет тип PRODUCT
    const category = await this.prisma.category.findUnique({
      where: { id: data.category_id },
    });
    if (!category) throw new BadRequestException("Категория не найдена");
    if (category.type !== "PRODUCT")
      throw new BadRequestException("Категория должна быть типа PRODUCT");

    const product = {
      name: data.name,
      description: data.description,
      image: data.image,
      category_id: data.category_id,
      price_USD: data.price_USD,
      discount_price_USD: data.discount_price_USD,
    };
    return await this.prisma.product.create({
      data: product,
      include: {
        images: true,
        category: true,
        local_products: {
          include: { local_item_descriptions: { orderBy: { order: "asc" } } },
        },
      },
    });
  }

  /**
   * Получение продукта с локализацией
   * @param id - id продукта
   * @param locale_id - id локализации
   * @returns продукт с локализацией и изображениями (ExtendedProduct) | null
   */
  async findOne(id: string, locale_id?: string): Promise<ExtendedProduct> {
    const include: Prisma.ProductInclude = this.getInclude(locale_id);
    const product = await this.prisma.product.findUnique({
      where: { id },
      include,
    });
    if (!product) throw new NotFoundException("Product not found");
    return product as unknown as ExtendedProduct;
  }

  /**
   * Обновление продукта
   * @param id - id продукта
   * @param data - данные для обновления продукта (UpdateProductDto)
   * @returns обновленный продукт (Product) | null
   */
  async update(
    id: string,
    data: UpdateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) throw new NotFoundException("Product not found");
    if (file) this.saveImage(data, file, existingProduct);

    // Если указана новая категория, проверяем её
    if (data.category_id) {
      const category = await this.prisma.category.findUnique({
        where: { id: data.category_id },
      });
      if (!category) throw new BadRequestException("Категория не найдена");
      if (category.type !== "PRODUCT")
        throw new BadRequestException("Категория должна быть типа PRODUCT");
    }

    const product = {
      name: data.name || existingProduct.name,
      description: data.description || existingProduct.description,
      image: data.image || existingProduct.image,
      category_id: data.category_id || existingProduct.category_id,
      price_USD: data.price_USD || existingProduct.price_USD,
      discount_price_USD:
        data.discount_price_USD || existingProduct.discount_price_USD,
    };
    return this.prisma.product.update({
      where: { id },
      data: product,
      include: this.getInclude(),
    });
  }

  /**
   * Удаление продукта
   * @param id - id продукта
   * @returns удаленный продукт (Product) | null
   */
  async delete(id: string): Promise<Product> {
    return (await this.findOne(id)).is_excluded
      ? await this.prisma.product.delete({ where: { id } })
      : await this.update(id, { is_excluded: true });
  }
}
