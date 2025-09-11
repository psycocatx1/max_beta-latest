import { BaseListResult, Locale, Prisma, PrismaService } from "@lib/prisma";
import { Injectable } from "@nestjs/common";
import { LocaleFiltersDto } from "../dto";

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) { }

  customFilters = (options: LocaleFiltersDto) => {
    const { search, is_excluded, symbol } = options;
    const filters: Prisma.LocaleWhereInput = {};
    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { language: { contains: search, mode: "insensitive" } },
        { symbol: { contains: search, mode: "insensitive" } },
        { currency: { contains: search, mode: "insensitive" } },
        { currency_symbol: { contains: search, mode: "insensitive" } },
        { phone_code: { contains: search, mode: "insensitive" } },
      ];
    }
    if (is_excluded !== undefined) filters.is_excluded = is_excluded;
    if (symbol) filters.symbol = symbol;
    return filters;
  };

  /**
   * Поиск всех локализаций
   * @param filterDto - данные для поиска локализаций
   * @returns список локализаций
   */
  async findAll(filters: LocaleFiltersDto): Promise<BaseListResult<Locale>> {
    const queryOptions = this.prisma.buildQuery(
      filters,
      "created",
      "created",
      this.customFilters,
    );
    const { items, count } = await this.prisma.findWithPagination<Locale>(
      this.prisma.locale,
      queryOptions,
    );
    return {
      items: items,
      total: count,
      take: filters.take,
      skip: filters.skip,
    };
  }
}
