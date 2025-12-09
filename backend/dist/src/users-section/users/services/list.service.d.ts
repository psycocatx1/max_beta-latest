import { BaseListResult, PrismaService, User, Prisma } from "@lib/prisma";
import { UserFiltersDto } from "../dto";
export declare class UsersListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    customFilters: (options: UserFiltersDto) => Prisma.UserWhereInput;
    findAll(filters: UserFiltersDto): Promise<BaseListResult<User>>;
}
