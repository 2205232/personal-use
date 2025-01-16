import express from 'express';
import cors from 'cors';
import cookieParse from 'cookie-parser';
// import { BigQuery } from '@google-cloud/bigquery';
// import chatRoutes  from './src/routes/chatRoutes.js';
// import FileUploadRoutes from './src/routes/UploadRoutes.js';
// import createAccountRoutes from './src/routes/createAccountRoutes.js';


// Initialize Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParse());

// Register routes
// app.use('/api', chatRoutes);
// app.use('/api', FileUploadRoutes);
// app.use('/api', createAccountRoutes);




export default app;
