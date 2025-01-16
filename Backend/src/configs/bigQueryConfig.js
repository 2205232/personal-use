import { BigQuery } from '@google-cloud/bigquery';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize BigQuery client using environment variables
const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID, 
  DATASET_ID:process.env.DATASET_ID ,
  TABLE_ID:process.env.GCP_TABLE ,
  key : Buffer.from(process.env.PRIVATE_KEY , 'base64').toString('ascii')
  // TABLE_ID: process.env.GCP-TABLE,
  //credentials: JSON.parse(Buffer.from(process.env.BIGQUERY_KEY_BASE64, 'base64').toString('utf8')) // Parse base64-encoded credentials
});

export default bigquery;