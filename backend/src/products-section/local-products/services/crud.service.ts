import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService, LocalProduct } from "@lib/prisma";
import { CreateLocalProductDto, UpdateLocalProductDto } from "../dto";
import { CrudService as ProductCrudService } from "../../products/services/crud.service";
import { CrudService as LocaleCrudService } from "../../../locales-section/locales/services/crud.service";
import { ExtendedLocalProduct } from "../example.data";

@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductCrudService,
    private readonly localeService: LocaleCrudService,
  ) {}

  /**
   * Создание локализации продукта
   * @param dto - данные для создания локализации продукта
   * @returns созданную локализацию продукта
   */
  async create(dto: CreateLocalProductDto): Promise<ExtendedLocalProduct> {
    await this.productService.findOne(dto.product_id);
    await this.localeService.findOne({ id: dto.locale_id });
    return this.prisma.localProduct.create({
      data: dto,
      include: {
        product: true,
        locale: true,
        local_item_descriptions: true,
      },
    });
  }

  /**
   * Обновление локализации продукта
   * @param id - id локализации продукта
   * @param dto - данные для обновления локализации продукта
   * @returns обновленную локализацию продукта
   */
  async update(
    id: string,
    dto: UpdateLocalProductDto,
  ): Promise<ExtendedLocalProduct> {
    await this.findOne(id);
    return await this.prisma.localProduct.update({
      where: { id },
      data: dto,
      include: {
        product: true,
        locale: true,
        local_item_descriptions: true,
      },
    });
  }

  /**
   * Удаление локализации продукта
   * @param id - id локализации продукта
   * @returns удаленную локализацию продукта
   */
  async delete(id: string): Promise<LocalProduct> {
    const local_product = await this.findOne(id);
    return this.prisma.localProduct.update({
      where: { id: local_product.id },
      data: { is_excluded: true },
    });
  }

  /**
   * Получение локализации продукта
   * @param params - параметры для проверки
   */
  async findOne(id: string): Promise<ExtendedLocalProduct> {
    const local_product = await this.prisma.localProduct.findUnique({
      where: { id },
      include: {
        product: true,
        locale: true,
        local_item_descriptions: true,
      },
    });
    if (!local_product)
      throw new NotFoundException("Локализация продукта не найдена");
    return local_product;
  }
}
