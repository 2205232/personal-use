import uploadService from '../services/uploadService.js';
import downloadUtil from '../utils/downloadUtil.js';
import fs from 'fs';

// Handle file upload request
const uploadFiles = async (req, res) => {
  try {
    const files = req.files;
    for (const file of files) {
      await uploadService.uploadToGCS(file);
      fs.unlinkSync(file.path); // Cleanup temp file
    }
    res.status(200).send('Files uploaded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('File upload failed');
  }
};

// Handle URL upload request
const uploadFromUrl = async (req, res) => {
  const { url } = req.body;
  
  try {
    const tempFilePath = await downloadUtil.downloadFileFromUrl(url);
    await uploadService.uploadToGCS({
      path: tempFilePath,
      originalname: require('path').basename(url)
    });
    fs.unlinkSync(tempFilePath); // Clean up the temp file
    res.status(200).send('File from URL uploaded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to upload file from URL');
  }
};

 const getFileList = async (req, res) => {
  try {
    const fileList = await uploadService.getFilesList();
    res.status(200).send(fileList);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving file list');
  }
};



export default {
  uploadFiles,
  uploadFromUrl,
  getFileList
  

};