import { z } from "zod";

/**
 * Parsea fechas en diferentes formatos comunes
 * @param dateString - String de fecha a parsear
 * @returns Date object parseado
 */
export const parseDate = (dateString: string): Date => {
    // Intentar diferentes formatos comunes
    const formats = [
        // dd-mm-yyyy o dd/mm/yyyy
        /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/,
        // yyyy-mm-dd
        /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/
    ];

    for (const format of formats) {
        const match = dateString.match(format);
        if (match) {
            if (format === formats[0]) {
                // dd-mm-yyyy format
                const [, day, month, year] = match;
                return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            } else {
                // yyyy-mm-dd format
                const [, year, month, day] = match;
                return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }
        }
    }

    // Si no coincide con ningún formato, intentar parseo estándar
    return new Date(dateString);
};

/**
 * Validación base para fechas - acepta múltiples formatos
 * @returns Zod schema para validación de fechas
 */
export const baseDateValidation = () => {
    return z.string()
        .transform((dateString) => parseDate(dateString))
        .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date format. Use DD-MM-YYYY, DD/MM/YYYY, or YYYY-MM-DD"
        });
};

/**
 * Validación para fechas de nacimiento (birthdate)
 * @returns Zod schema con validaciones específicas para birthdate
 */
export const birthdateValidation = () => {
    return baseDateValidation()
        .refine((date) => {
            const today = new Date();
            const hundredYearsAgo = new Date();
            hundredYearsAgo.setFullYear(today.getFullYear() - 100);
            return date >= hundredYearsAgo && date <= today;
        }, {
            message: "Birthdate must be between 100 years ago and today"
        });
};

/**
 * Validación para fechas futuras (eventos, citas, etc.)
 * @param maxYearsInFuture - Máximo años en el futuro permitidos (default: 10)
 * @returns Zod schema para fechas futuras
 */
export const futureDateValidation = (maxYearsInFuture: number = 10) => {
    return baseDateValidation()
        .refine((date) => {
            const today = new Date();
            const maxFutureDate = new Date();
            maxFutureDate.setFullYear(today.getFullYear() + maxYearsInFuture);
            return date >= today && date <= maxFutureDate;
        }, {
            message: `Date must be between today and ${maxYearsInFuture} years in the future`
        });
};

/**
 * Validación para fechas pasadas (registro, eventos históricos, etc.)
 * @param maxYearsPast - Máximo años en el pasado permitidos (default: 50)
 * @returns Zod schema para fechas pasadas
 */
export const pastDateValidation = (maxYearsPast: number = 50) => {
    return baseDateValidation()
        .refine((date) => {
            const today = new Date();
            const minPastDate = new Date();
            minPastDate.setFullYear(today.getFullYear() - maxYearsPast);
            return date >= minPastDate && date <= today;
        }, {
            message: `Date must be between ${maxYearsPast} years ago and today`
        });
};

/**
 * Validación para rango de fechas personalizado
 * @param minDate - Fecha mínima permitida
 * @param maxDate - Fecha máxima permitida
 * @returns Zod schema para rango personalizado
 */
export const dateRangeValidation = (minDate: Date, maxDate: Date) => {
    return baseDateValidation()
        .refine((date) => date >= minDate && date <= maxDate, {
            message: `Date must be between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`
        });
};

/**
 * Validación opcional para fechas (permite undefined/null)
 * @param validationFn - Función de validación a aplicar
 * @returns Zod schema opcional
 */
export const optionalDateValidation = (validationFn: () => any) => {
    return validationFn().optional();
};