import multer from 'multer';
import { envs } from '../config/envs.config.js';

const MAX_SIZE = (Number(envs.MAX_IMAGE_SIZE_MB) || 5) * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic', 'image/heif'];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Formato de imagen no permitido'));
};

export const uploadSingleImage = multer({
    storage,
    limits: { fileSize: MAX_SIZE },
    fileFilter,
}).single('file'); // el campo del form debe llamarse "file"
