import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { BaseFilterOptions, SortDirection } from "./types/base-filter.dto";
import { PrismaClient } from "@prisma/client";
/**
 * Service for interacting with the database through Prisma ORM
 * Provides methods for building queries based on filter options
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Builds a Prisma query based on filter options
   * @param options Base filter options including pagination and sorting
   * @param default_sort Default field to sort by if not specified in options
   * @param date_field Field name to use for date filtering (default: 'created')
   * @param custom_filters Additional custom filter transformations
   * @returns Object with skip, take, where and orderBy parameters for Prisma queries
   */
  buildQuery<T extends Record<string, any>>(
    options: BaseFilterOptions,
    default_sort: keyof T & string = "created" as keyof T & string,
    date_field: keyof T & string = "created" as keyof T & string,
    custom_filters?: (options: BaseFilterOptions) => Partial<T>,
  ): {
    skip: number;
    take: number;
    where: Partial<T>;
    orderBy: Record<string, string>;
  } {
    const {
      skip = 0,
      take = 10,
      sort,
      sort_direction = SortDirection.DESC,
      start_date,
      end_date,
      ...filters
    } = options;

    const skipValue = Number(skip);
    const takeValue = Number(take);

    if (filters.skip) delete filters.skip;
    if (filters.take) delete filters.take;

    // Фильтруем пустые строки и undefined значения
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => {
        // Исключаем пустые строки, undefined, null
        if (value === undefined || value === null || value === "") return false;
        // Для строк также проверяем после trim()
        if (typeof value === "string" && value.trim() === "") return false;
        return true;
      }),
    );

    let where: Partial<T> = cleanFilters as Partial<T>;

    if (custom_filters) {
      const custom_where = custom_filters(options);
      where = { ...where, ...custom_where };
    }

    if (start_date || end_date) {
      const dateFilters: Record<string, unknown> = {};

      if (start_date && end_date) {
        dateFilters[date_field] = { gte: start_date, lte: end_date };
      } else if (start_date) {
        dateFilters[date_field] = { gte: start_date };
      } else if (end_date) {
        dateFilters[date_field] = { lte: end_date };
      }

      where = { ...where, ...(dateFilters as Partial<T>) };
    }

    let orderBy: Record<string, string>;

    if (sort) {
      if (sort.includes("_asc") || sort.includes("_desc")) {
        const [field, direction] = sort.split("_");
        orderBy = { [field]: direction };
      } else {
        orderBy = { [sort]: sort_direction };
      }
    } else {
      orderBy = { [default_sort]: "desc" };
    }

    return { skip: skipValue, take: takeValue, where, orderBy };
  }

  /**
   * Getting data with pagination and total count
   * @param model Prisma model (e.g., 'user', 'transaction')
   * @param query_options Query parameters including skip, take, where, orderBy
   * @param include Relationships to include in the results
   * @returns Object with items and total count
   */
  async findWithPagination<T = any>(
    model: {
      findMany: (options: any) => Promise<T[]>;
      count: (options: any) => Promise<number>;
    },
    query_options: {
      skip: number;
      take: number;
      where: unknown;
      orderBy: unknown;
    },
    include: Record<string, unknown> = {},
  ): Promise<{ items: T[]; count: number }> {
    const { skip, take, where, orderBy } = query_options;

    if (where && typeof where === "object") {
      if ("skip" in where) delete where.skip;
      if ("take" in where) delete where.take;
      if ("search" in where) delete where.search;
    }

    const [items, count] = await Promise.all([
      model.findMany({
        skip,
        take,
        where,
        orderBy,
        include,
      }),
      model.count({ where }),
    ]);

    return {
      items: items,
      count,
    };
  }
}
