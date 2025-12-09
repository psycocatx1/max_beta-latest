import { BaseListResult, Locale } from "@lib/prisma";
import { Form } from "@prisma/client";
export interface ExtendedForm extends Form {
    locale: Locale;
}
export declare const example_extended_form: ExtendedForm;
export declare const example_forms_list_result: BaseListResult<ExtendedForm>;
