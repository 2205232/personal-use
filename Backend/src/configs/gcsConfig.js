import {Storage} from '@google-cloud/storage';

// Initialize Google Cloud Storage client
const storage = new Storage(); 
const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

export default bucket;
