import gcpfileuploadService from '../services/gcpfileuploadService.js';

// Controller for uploading files to GCP
exports.uploadFiles = async (req, res) => {
  try {
    const uploadedFiles = await gcpfileuploadService.uploadFilesToGCP(req.files);
    res.json({ files: uploadedFiles });
  } catch (error) {
    console.error('Error in uploadFiles controller:', error);
    res.status(500).send('Failed to upload files');
  }
};

// Controller for processing files
exports.processFiles = (req, res) => {
  const fileNames = req.body.fileNames;
  const processedFiles = fileNames.map((name) => ({
    name,
    status: 'Processed',
  }));
  res.json({ files: processedFiles });
};

export default {
    processFiles,
    uploadFiles,
   // getFileList
    
  
  };