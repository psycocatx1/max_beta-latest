import { Service } from "@lib/prisma";
export declare class CreateServiceDto implements Partial<Service> {
    name: string;
    category_id: string;
    price_USD: number;
    discount_price_USD?: number;
    description: string;
    image?: string;
}
