import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@lib/prisma";
import { CreateLocalCategoryDto, UpdateLocalCategoryDto } from "../dto";
import { CrudService as CategoriesCrudService } from "src/categories-section/categories/services";
import { CrudService as LocalesCrudService } from "src/locales-section/locales/services";

@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoriesCrudService,
    private readonly localeService: LocalesCrudService,
  ) {}
  /**
   * Создание локальной категории
   * @param data - данные для создания локальной категории
   * @returns созданную локальную категорию
   */
  async create(data: CreateLocalCategoryDto) {
    // Проверяем существование категории и локали
    await Promise.all([
      this.categoryService.findOne(data.category_id),
      this.localeService.findOne({ id: data.locale_id }),
    ]);
    return await this.prisma.localCategory.create({
      data,
      include: {
        category: true,
        locale: true,
      },
    });
  }
  /**
   * Обновление локальной категории
   * @param id - ID локальной категории
   * @param data - данные для обновления локальной категории
   * @returns обновленную локальную категорию
   */
  async update(id: string, data: UpdateLocalCategoryDto) {
    const local_category = await this.findOne(id);
    return await this.prisma.localCategory.update({
      where: { id: local_category.id },
      data,
      include: {
        category: true,
        locale: true,
      },
    });
  }
  /**
   * Удаление локальной категории
   * @param id - ID локальной категории
   * @returns удаленную локальную категорию
   */
  async delete(id: string) {
    const local_category = await this.findOne(id);
    return await this.prisma.localCategory.update({
      where: { id: local_category.id },
      data: { is_excluded: true },
    });
  }
  /**
   * Получение локальной категории по ID
   * @param id - ID локальной категории
   * @returns локальную категорию
   */
  async findOne(id: string) {
    const local_category = await this.prisma.localCategory.findUnique({
      where: { id },
      include: {
        category: true,
        locale: true,
      },
    });
    if (!local_category)
      throw new NotFoundException("Локальная категория не найдена");
    return local_category;
  }
}
