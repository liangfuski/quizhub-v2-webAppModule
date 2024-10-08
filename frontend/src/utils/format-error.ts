import { ActionErrors, FieldErrors } from "./type";

export function getErrorsForField(field: string, error: string): ActionErrors {
    return {
        fieldErrors: {
            [field]: error
        }
    }
}

export function getErrorsForForm(error: string): ActionErrors {
    return {
        formErrors: [error]
    }
}