import { Form } from "@prisma/client";
import { CreativeOmit } from "src/types/creative-omit.type";
export declare class CreateFormDto implements Omit<CreativeOmit<Form>, "is_read" | "is_answered" | "locale_id" | "ip_address"> {
    sender_name: string;
    company_name: string;
    phone_number: string;
    email: string;
    message: string;
}
