import { Locale } from "@lib/prisma";
export declare class CreateLocaleDto implements Partial<Locale> {
    name: string;
    language: string;
    symbol: string;
    currency: string;
    currency_symbol: string;
    phone_code: string;
    image?: string;
}
