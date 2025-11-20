import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

/**
 * Available locations for validating data in an HTTP request
 * @typedef {"body" | "query" | "params" | "formData"} Location
 */
type Location = "body" | "query" | "params" | "formData";

/**
 * Validation middleware for HTTP requests using Zod schemas
 * 
 * @description
 * This middleware validates HTTP request data (body, query parameters, or route parameters)
 * using a Zod schema. If validation fails, it returns a 400 error with specific details.
 * If validation succeeds, it replaces the original data with the validated and parsed data.
 * 
 * @param {ZodType} schema - Zod schema to validate the data
 * @param {Location} [location="body"] - Location of the data to validate (body, query, or params)
 * 
 * @returns {Function} Express middleware that validates the request
 * 
 * @example
 * // Validate request body
 * import { z } from "zod";
 * import { validate } from "./middlewares/validate-request";
 * 
 * const userSchema = z.object({
 *   name: z.string().min(1),
 *   email: z.string().email()
 * });
 * 
 * app.post("/users", validate(userSchema), (req, res) => {
 *   // req.body is now validated and typed
 *   console.log(req.body.name, req.body.email);
 * });
 * 
 * @example
 * // Validate query parameters
 * const querySchema = z.object({
 *   page: z.string().transform(Number),
 *   limit: z.string().transform(Number)
 * });
 * 
 * app.get("/users", validate(querySchema, "query"), (req, res) => {
 *   // req.query is validated and transformed
 * });
 * 
 * @example
 * // Validate route parameters
 * const paramsSchema = z.object({
 *   id: z.string().uuid()
 * });
 * 
 * app.get("/users/:id", validate(paramsSchema, "params"), (req, res) => {
 *   // req.params.id is validated as UUID
 * });
 */
export const validate =
    (schema: ZodType, location: Location = "body") =>
        /**
         * Express middleware function for request validation
         * 
         * @param {Request} req - Express request object
         * @param {Response} res - Express response object  
         * @param {NextFunction} next - Function to continue to the next middleware
         * 
         * @returns {void | Response} Error response if validation fails, or void if successful
         */
        (req: Request, res: Response, next: NextFunction) => {
            // Determine data source based on specified location
            let data: any;

            if (location === "formData") {
                // Para form-data, combinar datos del body con información de archivos
                data = { ...req.body };

                // Intentar parsear campos JSON que vienen como string
                Object.keys(data).forEach(key => {
                    if (typeof data[key] === 'string') {
                        // Intentar parsear si parece un JSON (array o objeto)
                        if (data[key].startsWith('[') || data[key].startsWith('{')) {
                            try {
                                data[key] = JSON.parse(data[key]);
                            } catch (e) {
                                // Si falla el parseo, mantener como string
                                // No hacer nada, quedará como string
                            }
                        }
                    }
                });

                // Si hay un archivo subido, agregar la URL del archivo al objeto de datos
                if ((req as any).file) {
                    const file = (req as any).file;
                    // Para el logoUrl, usar la ruta del archivo
                    if (file.fieldname === 'file' || file.fieldname === 'logo') {
                        data.logoUrl = file.path || file.filename || file.originalname;
                    } else {
                        data[file.fieldname] = file.path || file.filename || file.originalname;
                    }
                }

                // Si hay múltiples archivos
                if ((req as any).files) {
                    const files = (req as any).files;
                    if (Array.isArray(files)) {
                        // Archivos en array
                        files.forEach((file: any) => {
                            data[file.fieldname] = file.path || file.filename || file.originalname;
                        });
                    } else {
                        // Archivos como objeto
                        Object.keys(files).forEach(fieldname => {
                            const fileArray = files[fieldname];
                            if (Array.isArray(fileArray) && fileArray.length > 0) {
                                data[fieldname] = fileArray[0].path || fileArray[0].filename || fileArray[0].originalname;
                            }
                        });
                    }
                }
            } else {
                // Para otros tipos de validación
                data =
                    location === "body" ? req.body :
                        location === "query" ? req.query :
                            req.params;
            }

            // Execute Zod validation safely
            const result = schema.safeParse(data);

            // If validation fails, return 400 error with details
            if (!result.success) {
                const { fieldErrors, formErrors } = result.error.flatten();
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid request",
                    errors: fieldErrors,
                    formErrors,
                });
            }

            // If validation succeeds, replace original data with validated data
            if (location === "body" || location === "formData") req.body = result.data;
            if (location === "query") req.query = result.data as any;
            if (location === "params") req.params = result.data as any;

            // Continue to next middleware
            next();
        };
