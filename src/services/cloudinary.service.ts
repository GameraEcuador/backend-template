import streamifier from 'streamifier';
import { envs } from '../config/envs.config.js';
import { cloudinary } from '../config/cloudinary.config.js';
import { logger } from '../config/logger.config.js';

type UploadResult = { url: string; publicId: string };

export class CloudinaryService {
    private readonly baseFolder: string;

    constructor() {
        this.baseFolder = envs.CLOUDINARY_FOLDER;
    }

    /**
     * Sube un buffer de imagen a Cloudinary
     * @param buffer - Buffer de la imagen
     * @param options - Opciones de subida (folder, overwrite)
     * @returns Promise<UploadResult> - URL y publicId de la imagen subida
     */
    async uploadBuffer(
        buffer: Buffer,
        options?: { folder?: string; overwrite?: boolean }
    ): Promise<UploadResult> {
        const folder = `${this.baseFolder}/${options?.folder}` || this.baseFolder;

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    overwrite: options?.overwrite ?? false,
                    resource_type: 'image',
                    // puedes forzar formato de salida si quieres: format: 'webp'
                },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve({ url: result.secure_url, publicId: result.public_id });
                }
            );

            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
    }

    /**
     * Elimina una imagen de Cloudinary usando su public_id
     * @param publicId - El ID público de la imagen en Cloudinary
     * @returns Promise<boolean> - true si se eliminó correctamente, false si hubo error
     */
    async deleteImage(publicId: string): Promise<boolean> {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            logger.info({ publicId, result: result.result }, 'Imagen eliminada de Cloudinary:');
            return result.result === 'ok';
        } catch (error) {
            logger.warn({ publicId, error }, 'Error eliminando imagen de Cloudinary:');
            return false;
        }
    }

    /**
     * Elimina múltiples imágenes de Cloudinary
     * @param publicIds - Array de IDs públicos de las imágenes
     * @returns Promise<{ deleted: string[], failed: string[] }> - Resultado de eliminación
     */
    async deleteMultipleImages(publicIds: string[]): Promise<{ deleted: string[], failed: string[] }> {
        const results = await Promise.allSettled(
            publicIds.map(publicId => this.deleteImage(publicId))
        );

        const deleted: string[] = [];
        const failed: string[] = [];

        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                deleted.push(publicIds[index]);
            } else {
                failed.push(publicIds[index]);
            }
        });

        return { deleted, failed };
    }

    /**
     * Extrae el public_id de una URL de Cloudinary
     * @param url - URL de Cloudinary
     * @returns string | null - public_id o null si no se puede extraer
     */
    extractPublicIdFromUrl(url: string): string | null {
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
            console.warn('Error extrayendo public_id de URL:', error);
        }
        return null;
    }

    /**
     * Reemplaza una imagen existente por una nueva
     * @param oldImageUrl - URL de la imagen antigua
     * @param newImageBuffer - Buffer de la nueva imagen
     * @param options - Opciones de subida
     * @returns Promise<UploadResult> - URL y publicId de la nueva imagen
     */
    async replaceImage(
        oldImageUrl: string,
        newImageBuffer: Buffer,
        options?: { folder?: string }
    ): Promise<UploadResult> {
        // Subir la nueva imagen
        const newImage = await this.uploadBuffer(newImageBuffer, options);

        // Eliminar la imagen anterior
        const oldPublicId = this.extractPublicIdFromUrl(oldImageUrl);
        if (oldPublicId) {
            await this.deleteImage(oldPublicId);
        }

        return newImage;
    }
}
