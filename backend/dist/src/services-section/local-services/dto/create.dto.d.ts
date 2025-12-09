import { LocalService } from "@lib/prisma";
export declare class CreateLocalServiceDto implements Partial<LocalService> {
    name: string;
    description: string;
    price: number;
    discount_price?: number;
    locale_id: string;
    service_id: string;
}
