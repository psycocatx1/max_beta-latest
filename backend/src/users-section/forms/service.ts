import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService, Prisma, BaseListResult, Form } from "@lib/prisma";
import { CreateFormDto, FormsFiltersDto } from "./dto";

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateFormDto,
    req: Request,
    locale_symbol: string,
  ): Promise<Form> {
    const ip_address = this.getClientIp(req);
    await this.checkIpLimit(ip_address);
    const locale = await this.prisma.locale.findUnique({
      where: { symbol: locale_symbol.toUpperCase() },
    });

    if (!locale)
      throw new BadRequestException(
        `Locale with symbol '${locale_symbol}' not found`,
      );

    const form_data = {
      ...dto,
      ip_address,
      locale_id: locale.id,
    };

    return await this.prisma.form.create({ data: form_data });
  }

  private getClientIp(req: Request): string {
    // Пробуем различные способы получения IP адреса
    const forwarded = req.headers["x-forwarded-for"] as string;
    const realIp = req.headers["x-real-ip"] as string;
    const clientIp = req.headers["cf-connecting-ip"] as string; // Cloudflare

    let ip =
      (forwarded ? forwarded.split(",")[0].trim() : null) ||
      realIp ||
      clientIp ||
      "127.0.0.1";

    // Преобразуем IPv6 localhost в IPv4 для читаемости
    if (ip === "::1" || ip === "::ffff:127.0.0.1") ip = "127.0.0.1";

    return ip;
  }

  private async checkIpLimit(ip_address: string): Promise<void> {
    const today_start = new Date();
    today_start.setHours(0, 0, 0, 0);
    const today_end = new Date();
    today_end.setHours(23, 59, 59, 999);
    const forms_count = await this.prisma.form.count({
      where: {
        ip_address,
        created: {
          gte: today_start,
          lte: today_end,
        },
      },
    });
    if (forms_count >= 3)
      throw new BadRequestException(
        "Daily form submission limit exceeded for this IP address",
      );
  }

  async findOne(id: string) {
    const form = await this.prisma.form.findUnique({ where: { id } });
    if (!form) throw new NotFoundException("Form not found");
    await this.prisma.form.update({ where: { id }, data: { is_read: true } });
    return form;
  }

  customFilters = (options: FormsFiltersDto) => {
    const { search, is_read, is_answered } = options;
    const filters: Prisma.FormWhereInput = {};
    if (search) {
      filters.OR = [
        { sender_name: { contains: search, mode: "insensitive" } },
        { company_name: { contains: search, mode: "insensitive" } },
        { phone_number: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }
    if (is_read !== undefined) filters.is_read = is_read;
    if (is_answered !== undefined) filters.is_answered = is_answered;
    return filters;
  };

  async findAll(filters: FormsFiltersDto): Promise<BaseListResult<Form>> {
    const query_options = this.prisma.buildQuery(
      filters,
      "created",
      "created",
      (filters) => this.customFilters(filters as FormsFiltersDto),
    );
    const { items, count } = await this.prisma.findWithPagination(
      this.prisma.form,
      query_options,
    );
    return {
      items,
      total: count,
      skip: filters.skip,
      take: filters.take,
    };
  }

  async answer(id: string) {
    await this.findOne(id);
    return await this.prisma.form.update({
      where: { id },
      data: { is_answered: true },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return await this.prisma.form.delete({ where: { id } });
  }
}
