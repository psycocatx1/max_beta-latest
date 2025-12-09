import { CreateFormDto, FormsFiltersDto } from "./dto";
import { FormsService } from "./service";
export declare class FormsController {
    private readonly formsService;
    constructor(formsService: FormsService);
    create(dto: CreateFormDto, req: Request, locale: string): Promise<{
        created: Date;
        email: string;
        message: string;
        phone_number: string;
        id: string;
        updated: Date;
        locale_id: string | null;
        ip_address: string;
        sender_name: string;
        company_name: string | null;
        is_read: boolean;
        is_answered: boolean;
    }>;
    findAll(filters: FormsFiltersDto): Promise<import("../../../libs/prisma/src").BaseListResult<{
        created: Date;
        email: string;
        message: string;
        phone_number: string;
        id: string;
        updated: Date;
        locale_id: string | null;
        ip_address: string;
        sender_name: string;
        company_name: string | null;
        is_read: boolean;
        is_answered: boolean;
    }>>;
    findOne(id: string): Promise<{
        created: Date;
        email: string;
        message: string;
        phone_number: string;
        id: string;
        updated: Date;
        locale_id: string | null;
        ip_address: string;
        sender_name: string;
        company_name: string | null;
        is_read: boolean;
        is_answered: boolean;
    }>;
    answer(id: string): Promise<{
        created: Date;
        email: string;
        message: string;
        phone_number: string;
        id: string;
        updated: Date;
        locale_id: string | null;
        ip_address: string;
        sender_name: string;
        company_name: string | null;
        is_read: boolean;
        is_answered: boolean;
    }>;
    delete(id: string): Promise<{
        created: Date;
        email: string;
        message: string;
        phone_number: string;
        id: string;
        updated: Date;
        locale_id: string | null;
        ip_address: string;
        sender_name: string;
        company_name: string | null;
        is_read: boolean;
        is_answered: boolean;
    }>;
}
