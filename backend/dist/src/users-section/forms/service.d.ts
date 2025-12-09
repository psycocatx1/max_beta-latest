import { PrismaService, Prisma, BaseListResult, Form } from "@lib/prisma";
import { CreateFormDto, FormsFiltersDto } from "./dto";
export declare class FormsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFormDto, req: Request, locale_symbol: string): Promise<Form>;
    private getClientIp;
    private checkIpLimit;
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
    customFilters: (options: FormsFiltersDto) => Prisma.FormWhereInput;
    findAll(filters: FormsFiltersDto): Promise<BaseListResult<Form>>;
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
