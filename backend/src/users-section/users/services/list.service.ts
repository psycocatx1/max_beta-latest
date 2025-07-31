import { BaseListResult, PrismaService, User, Prisma } from "@lib/prisma";
import { Injectable } from "@nestjs/common";
import { UserFiltersDto } from "../dto";

@Injectable()
export class UsersListService {
  constructor(private readonly prisma: PrismaService) {}

  customFilters = (options: UserFiltersDto) => {
    const { role, is_banned, email, search, phone_number, locale_id } = options;
    const filters: Prisma.UserWhereInput = {};
    if (role) filters.role = role;
    if (is_banned !== undefined && is_banned !== null)
      filters.is_banned = is_banned;
    if (email && email.trim().length > 0)
      filters.email = { contains: email.trim(), mode: "insensitive" };
    if (locale_id && locale_id.trim().length > 0) filters.locale_id = locale_id;
    if (search && search.trim().length > 0) {
      filters.OR = [
        { first_name: { contains: search.trim(), mode: "insensitive" } },
        { last_name: { contains: search.trim(), mode: "insensitive" } },
        { email: { contains: search.trim(), mode: "insensitive" } },
        { phone_number: { contains: search.trim(), mode: "insensitive" } },
      ];
    }
    if (phone_number && phone_number.trim().length > 0)
      filters.phone_number = phone_number;
    return filters;
  };

  async findAll(filters: UserFiltersDto): Promise<BaseListResult<User>> {
    const queryOptions = this.prisma.buildQuery(
      filters,
      "created",
      "created",
      this.customFilters,
    );

    const { items, count } = await this.prisma.findWithPagination<User>(
      this.prisma.user,
      queryOptions,
      { locale: true },
    );

    return {
      items: items.map((item: User) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hashed_password, ...user } = item;
        return user;
      }) as User[],
      total: count,
      skip: filters.skip,
      take: filters.take,
    };
  }
}
