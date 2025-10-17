import { emailSchema, nameSchema, phoneSchema, descriptionSchema } from "../../../utils/validation/ValidationSchemas";

export const LanguageValidationSchema = {
    locale: nameSchema,
    name: nameSchema,
}