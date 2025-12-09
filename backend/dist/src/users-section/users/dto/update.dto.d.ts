import { User, Role } from "@prisma/client";
export declare class UpdateUserDto implements Partial<User> {
    password?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    image?: string;
    locale_id?: string;
}
export declare class AdminUpdateUserDto extends UpdateUserDto {
    email?: string;
    role?: Role;
    is_banned?: boolean;
}
