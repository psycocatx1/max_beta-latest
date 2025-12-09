import { AdminUpdateUserDto, UpdateUserDto } from "./dto/update.dto";
import { UserFiltersDto } from "./dto/filters.dto";
import { Prisma } from "@lib/prisma";
import { UsersListService, UsersCrudService } from "./services";
export declare class UsersController {
    private readonly usersListService;
    private readonly usersCrudService;
    constructor(usersListService: UsersListService, usersCrudService: UsersCrudService);
    findOne(where: Prisma.UserWhereUniqueInput): Promise<{
        locale: {
            symbol: string;
            name: string;
        } | null;
        created: Date;
        email: string;
        first_name: string | null;
        last_name: string | null;
        phone_number: string | null;
        id: string;
        image: string | null;
        updated: Date;
        role: import(".prisma/client").$Enums.Role;
        is_banned: boolean;
        locale_id: string | null;
    } | null>;
    findAll(filters: UserFiltersDto): Promise<import("@lib/prisma").BaseListResult<{
        created: Date;
        email: string;
        first_name: string | null;
        last_name: string | null;
        phone_number: string | null;
        id: string;
        hashed_password: string;
        image: string | null;
        updated: Date;
        role: import(".prisma/client").$Enums.Role;
        is_banned: boolean;
        locale_id: string | null;
    }>>;
    me(req: Request & {
        user: {
            id: string;
        };
    }): Promise<{
        locale: {
            symbol: string;
            name: string;
        } | null;
        created: Date;
        email: string;
        first_name: string | null;
        last_name: string | null;
        phone_number: string | null;
        id: string;
        image: string | null;
        updated: Date;
        role: import(".prisma/client").$Enums.Role;
        is_banned: boolean;
        locale_id: string | null;
    } | null>;
    update(where: Prisma.UserWhereUniqueInput, updateUserDto: UpdateUserDto): Promise<{
        locale: {
            symbol: string;
            name: string;
        } | null;
        created: Date;
        email: string;
        first_name: string | null;
        last_name: string | null;
        phone_number: string | null;
        id: string;
        image: string | null;
        updated: Date;
        role: import(".prisma/client").$Enums.Role;
        is_banned: boolean;
        locale_id: string | null;
    }>;
    adminUpdate(where: Prisma.UserWhereUniqueInput, updateUserDto: AdminUpdateUserDto): Promise<{
        locale: {
            symbol: string;
            name: string;
        } | null;
        created: Date;
        email: string;
        first_name: string | null;
        last_name: string | null;
        phone_number: string | null;
        id: string;
        image: string | null;
        updated: Date;
        role: import(".prisma/client").$Enums.Role;
        is_banned: boolean;
        locale_id: string | null;
    }>;
}
