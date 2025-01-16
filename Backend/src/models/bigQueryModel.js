//import bigquery from '../configs/bigQueryConfig.js';
import { BigQuery } from '@google-cloud/bigquery';
import dotenv from 'dotenv';

dotenv.config();

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  credentials: JSON.parse(process.env.GCP_CREDENTIALS)
});


export const fetchChatHistory = async (userId) => {
  const datasetId = process.env.DATASET_ID;
  const tableId = process.env.GCP_TABLE;

  const query = `
    SELECT * FROM \`${datasetId}.${tableId}\` WHERE user_id = @userId
    ORDER BY timestamp DESC
    LIMIT 50
  `;

  const options = {
    query: query,
    params: { userId } // Use parameterized query to bind userId
  };

  try {
    const [rows] = await bigquery.query(options); // Fetch data from BigQuery
    return rows;
  } catch (error) {
    console.error('Error querying chat history by user_id:', error);
    throw error;
  }
};

export const fetchChatHistoryList = async (userId) => {
  const datasetId = process.env.DATASET_ID;
  const tableId = process.env.NEW_TABLE;

  const query = `
    SELECT *  FROM \`${datasetId}.${tableId}\` WHERE user_id = @userId and status=true
    ORDER BY date DESC
    LIMIT 50
  `;
  const options = {
    query: query,
    params: { userId } // Use parameterized query to bind userId
  };
  
  try {
    const [rows] = await bigquery.query(options );
    return rows; // Return the list of chat sessions (id, title, date)
  } catch (error) {
    console.error('Error fetching chat history list:', error);
    throw error;
  }
};

export const fetchChatHistoryById =  async (chatId) => {
  const datasetId = process.env.DATASET_ID;
  const tableId = process.env.NEW_TABLE;

  const query = `
    SELECT messages
    FROM \`${datasetId}.${tableId}\`
    WHERE cast(id as string) = @chatId
  `;

  const options = {
    query: query,
    params: { chatId } // Bind the chatId parameter
  };
   
  try {
    const [rows] = await bigquery.query(options);
    return rows[0].messages; // Return the messages array for the selected chat
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

// Save chat messages to BigQuery
export const saveChatMessages = async (rows) => {
  const datasetId = process.env.DATASET_ID;
  const tableId = process.env.GCP_TABLE;
  try {
    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log('Rows successfully inserted.');
  } catch (error) {
    console.error('Error inserting rows:', error);
    throw error;
  }
};

export const saveChatMessages1 = async (chatSession) => {
  const datasetId = process.env.DATASET_ID;
  const tableId = process.env.NEW_TABLE;

  const rows = [
    {
      id: chatSession.id,
      title: chatSession.title,
      date: chatSession.date,
      user_id: chatSession.userId,
      messages: chatSession.messages.map(msg => ({
        text: msg.text,
        sender: msg.sender
      }))
    }
  ];

  try {
    // Insert rows into the BigQuery table
    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log(`Inserted chat session with id ${chatSession.id}`);
    return { success: true };
  } catch (error) {
    console.error('Error inserting chat session:', error);
    throw new Error('Failed to save chat session in BigQuery');
  }
};

// Clear chat history
// const clearChatHistory = async () => {
//   const query = `
//     DELETE FROM \your_dataset.your_table\
//     WHERE TRUE
//   `;
//   return await bigquery.query({ query });
// };

// Summarize recent chat
// const summarizeChat = async () => {
//   const query = `
//     SELECT message, sender
//     FROM \your_dataset.your_table\
//     ORDER BY timestamp DESC
//     LIMIT 10
//   `;
//   return await bigquery.query({ query });
// };

// Function to insert data into BigQuery
export const createAccount =async(accountData)=> {
  const { firstName, lastName, email, password } = accountData;
  
  const datasetId = bigQueryConfig.datasetId;  // Dataset ID from config
  const tableId = bigQueryConfig.tableId;      // Table ID from config

  const rows = [
    { firstName, lastName, email, password,},
  ];

  try {
    // Insert rows into the BigQuery table
    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log(`nserted ${rows.length} row(s) into ${tableId}`);
    return { success: true };
  } catch (error) {
    console.error('Error inserting User Details :', error);
    throw new Error('Failed to save User Details in BigQuery');
  }

}

export default {
 
  saveChatMessages,
  fetchChatHistory,
  saveChatMessages1, 
  fetchChatHistoryList,
  fetchChatHistoryById,
  createAccount,
//   clearChatHistory,
//   summarizeChat
};