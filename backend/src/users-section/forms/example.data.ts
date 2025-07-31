import { BaseListResult, Locale } from "@lib/prisma";
import { Form } from "@prisma/client";
import { example_locale } from "src/locales-section";

const example_form: Form = {
  id: "1",
  sender_name: "John Doe",
  company_name: "Acme Inc.",
  phone_number: "+1234567890",
  email: "john.doe@example.com",
  message: "Hello, world!",
  ip_address: "127.0.0.1",
  is_read: false,
  is_answered: false,
  created: new Date(),
  updated: new Date(),
  locale_id: "1",
};

export interface ExtendedForm extends Form {
  locale: Locale;
}

export const example_extended_form: ExtendedForm = {
  ...example_form,
  locale: example_locale,
};

export const example_forms_list_result: BaseListResult<ExtendedForm> = {
  items: [example_extended_form],
  total: 1,
  skip: 0,
  take: 10,
};
