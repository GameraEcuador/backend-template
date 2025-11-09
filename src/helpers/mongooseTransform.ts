// src/helpers/mongooseTransform.ts

/**
 * Crea una función de transformación para esquemas Mongoose.
 * - Si no se pasan props, solo renombra `_id` a `id` y elimina `_id` y `__v`.
 * - Si se pasan strings como argumentos, también elimina esos atributos.
 *
 * @example
 *   transform: createTransform() // solo maneja _id y __v
 *   transform: createTransform('password', 'secretField') // además elimina esos campos
 */
export const createTransform = (...removeFields: string[]) => {
    return (_: any, ret: Record<string, any>) => {
        // Renombrar _id a id
        if (ret._id) {
            ret.id = ret._id.toString();
        }

        // Remover campos estándar siempre
        delete ret._id;
        delete ret.__v;

        // Remover campos personalizados, si existen
        removeFields.forEach((field) => {
            delete ret[field];
        });
    };
};
