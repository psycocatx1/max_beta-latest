import { PrismaService, Prisma } from "@lib/prisma";
import { AdminUpdateUserDto, UpdateUserDto } from "../dto";
export declare class UsersCrudService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(where: Prisma.UserWhereUniqueInput, check_only?: boolean): Promise<{
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
    update(where: Prisma.UserWhereUniqueInput, updateUserDto: UpdateUserDto | AdminUpdateUserDto): Promise<{
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
    private hashPassword;
}
