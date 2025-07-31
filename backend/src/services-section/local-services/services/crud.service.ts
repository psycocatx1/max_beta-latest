import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService, LocalService } from "@lib/prisma";
import { CreateLocalServiceDto, UpdateLocalServiceDto } from "../dto";
import { CrudService as ServiceCrudService } from "../../services/services/crud.service";
import { CrudService as LocaleCrudService } from "../../../locales-section/locales/services/crud.service";
import { ExtendedLocalService } from "../example.data";

@Injectable()
export class CrudService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceService: ServiceCrudService,
    private readonly localeService: LocaleCrudService,
  ) {}

  /**
   * Создание локализации услуги
   * @param dto - данные для создания локализации услуги
   * @returns созданную локализацию услуги
   */
  async create(dto: CreateLocalServiceDto): Promise<ExtendedLocalService> {
    await Promise.all([
      this.serviceService.findOne(dto.service_id),
      this.localeService.findOne({ id: dto.locale_id }),
    ]);
    return this.prisma.localService.create({
      data: dto,
      include: {
        service: true,
        locale: true,
        local_item_descriptions: true,
      },
    });
  }

  /**
   * Обновление локализации услуги
   * @param id - id локализации услуги
   * @param dto - данные для обновления локализации услуги
   * @returns обновленную локализацию услуги
   */
  async update(
    id: string,
    dto: UpdateLocalServiceDto,
  ): Promise<ExtendedLocalService> {
    await this.findOne(id);
    return await this.prisma.localService.update({
      where: { id },
      data: dto,
      include: {
        service: true,
        locale: true,
        local_item_descriptions: true,
      },
    });
  }

  /**
   * Удаление локализации услуги
   * @param id - id локализации услуги
   * @returns удаленную локализацию услуги
   */
  async delete(id: string): Promise<LocalService> {
    await this.findOne(id);
    return this.update(id, { is_excluded: true });
  }

  /**
   * Получение локализации услуги
   * @param id - id локализации услуги
   * @returns локализацию услуги
   */
  async findOne(id: string): Promise<ExtendedLocalService> {
    const local_service = await this.prisma.localService.findUnique({
      where: { id },
      include: {
        service: true,
        locale: true,
        local_item_descriptions: true,
      },
    });
    if (!local_service)
      throw new NotFoundException("Локализация услуги не найдена");
    return local_service;
  }
}
