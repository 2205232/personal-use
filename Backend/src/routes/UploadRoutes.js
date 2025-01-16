import express from 'express';
import multer from 'multer';
import uploadController from '../controllers/uploadController.js';

// Initialize Multer (for handling file uploads)
// const storageEngine = multer.memoryStorage();
// const upload = multer({ storage: storageEngine });


const FileUploadRoutes = express.Router();


// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for file uploads
FileUploadRoutes.post('/upload', upload.array('file'), uploadController.uploadFiles);

// Route for URL uploads
FileUploadRoutes.post('/upload-url', uploadController.uploadFromUrl);

FileUploadRoutes.get('/files', uploadController.getFileList);

export default FileUploadRoutes;

