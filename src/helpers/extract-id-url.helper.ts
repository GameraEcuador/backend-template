import { logger } from "../config/logger.config.js";

/**
    * Extrae el public_id de una URL de Cloudinary
    * @param url URL de Cloudinary
    * @returns public_id o null si no se puede extraer
    */
export const extractPublicIdFromUrl = (url: string): string | null => {
    try {
        // Ejemplo URL: https://res.cloudinary.com/demo/image/upload/v1234567890/business_profiles/sample.jpg
        const urlParts = url.split('/');
        const uploadIndex = urlParts.indexOf('upload');

        if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
            // Obtener la parte después de /upload/v{version}/
            const pathParts = urlParts.slice(uploadIndex + 2);
            // Unir las partes y remover la extensión
            const fullPath = pathParts.join('/');
            const publicId = fullPath.replace(/\.[^/.]+$/, ''); // Remover extensión
            return publicId;
        }
    } catch (error) {
        logger.error(error, 'Error extrayendo public_id de URL de Cloudinary:');
    }
    return null;
}