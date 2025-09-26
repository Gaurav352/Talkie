import multer from 'multer';
import { storage } from '../lib/cloudinary.js'; // your cloudinary storage

const upload = multer({ storage });

export default upload;
