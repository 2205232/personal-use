import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Download file from the given URL and save it temporarily
const downloadFileFromUrl = async (fileUrl) => {
  const tempFilePath = path.join(__dirname, '../uploads/', path.basename(fileUrl));
  const response = await axios({
    method: 'GET',
    url: fileUrl,
    responseType: 'stream'
  });

  const writer = fs.createWriteStream(tempFilePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(tempFilePath));
    writer.on('error', reject);
  });
};

export default {
    downloadFileFromUrl
  
  };