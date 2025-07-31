import { PrismaService, Locale } from "@lib/prisma";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLocaleDto, UpdateLocaleDto } from "../dto";
import { FilesService } from "../../../files/files.service";
import { TranslationsService } from "../../translations/services";
import { Prisma } from "@prisma/client";
@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
    private readonly translationsService: TranslationsService,
  ) {}
  /**
   * Сохраняет изображение локализации
   * @param data - данные для создания или обновления локализации
   * @param file - файл изображения
   * @param existingLocale - существующая локализация
   */
  private saveImage(
    data: CreateLocaleDto | UpdateLocaleDto,
    file: Express.Multer.File,
  ) {
    if (!this.filesService.isValidImage(file))
      throw new BadRequestException(
        "Недопустимый формат файла. Разрешены только JPEG, PNG и WebP",
      );
    if (!this.filesService.isValidSize(file, 5))
      throw new BadRequestException("Размер файла не должен превышать 5 МБ");
    data.image = this.filesService.saveImage(file, "locales");
  }
  /**
   * Создание локализации с файлом иконки
   * @param dto - данные для создания локализации
   * @param iconFile - файл иконки
   * @returns локализация
   */
  async create(
    data: CreateLocaleDto,
    file?: Express.Multer.File,
  ): Promise<Locale> {
    if (file) this.saveImage(data, file);
    if (!data.image) throw new BadRequestException("Изображение обязательно");
    // Создаем локализацию в базе данных
    const locale = await this.prisma.locale.create({
      data: { ...data, image: data.image },
    });
    // Автоматически создаем файлы переводов для новой локализации
    try {
      console.log(`Создание файлов переводов для локализации ${locale.symbol}`);
      const syncResult = await this.translationsService.createLocaleFiles(
        locale.symbol,
      );
      if (!syncResult.success)
        console.error(
          `Ошибки при создании файлов переводов для локализации ${locale.symbol}: ${syncResult.errors.join(", ")}`,
        );
    } catch (error) {
      console.error(
        `Ошибка создания файлов переводов для локализации ${locale.symbol}: ${String(error)}`,
      );
    }
    return locale;
  }
  /**
   * Поиск локализации по id
   * @param id - id локализации
   * @returns локализация
   */
  async findOne(where: Prisma.LocaleWhereUniqueInput): Promise<Locale> {
    const locale = await this.prisma.locale.findUnique({ where });
    if (!locale) throw new NotFoundException("Locale not found");
    return locale;
  }
  /**
   * Обновление локализации с файлом иконки
   * @param id - id локализации
   * @param dto - данные для обновления локализации
   * @param iconFile - файл иконки
   * @returns локализация
   */
  async update(
    where: Prisma.LocaleWhereUniqueInput,
    data: UpdateLocaleDto,
    file?: Express.Multer.File,
  ): Promise<Locale> {
    await this.findOne(where);
    if (file) this.saveImage(data, file);
    return this.prisma.locale.update({ where, data });
  }
  /**
   * Удаление локализации
   * @param id - id локализации
   * @returns локализация
   */
  async delete(where: Prisma.LocaleWhereUniqueInput): Promise<Locale> {
    return await this.update(where, { is_excluded: true });
  }
}
