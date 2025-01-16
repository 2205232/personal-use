import { saveChatMessages,saveChatMessages1 ,fetchChatHistory,fetchChatHistoryList,fetchChatHistoryById} from '../models/bigQueryModel.js';

// Get chat history
const getChatHistory = async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query params
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }   
    const chatHistory = await fetchChatHistory(userId); // Call the model function
    res.json(chatHistory); // Send the result back to the client

  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

const getChatHistory1 = async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query params
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    
    const chatHistory = await fetchChatHistoryList(userId); // Call the model function
    res.json(chatHistory); // Send the result back to the client

  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};
const getChatHistoryById = async (req, res) => {
  try {

    const chatId = req.params.chatId; // Extract userId from query params
    
    if (!chatId) {
      return res.status(400).json({ error: 'chatId is required' });
    }    
    const chatHistoryById = await fetchChatHistoryById(chatId); // Call the model function
    res.json(chatHistoryById); // Send the result back to the client

  } catch (error) {
   
    console.error('Error fetching chat history by Id:', error);
    res.status(500).json({ error: 'Failed to fetch chat historyBy Id' });
  }
};

// Save chat message
const saveChat = async (req, res,) => {
 
  try {
    const { userMessage, botMessage ,userid} = req.body;
    const rows = [
      { message: userMessage.text, sender: 'user',user_id:userid, timestamp: new Date() },
      { message: botMessage.text, sender: 'bot',user_id:userid, timestamp: new Date() }
    ];   
    await saveChatMessages(rows);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ error: 'Failed to save chat' });
  }
};
export const saveChat1 = async (req, res) => {
  try {
    const { id, title, date, messages ,userId} = req.body;

    // Validate required fields
    if (!id || !title || !date || !messages || !userId ||  !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Build chat session object
    const chatSession = { id, title, date, messages ,userId};

    // Save chat session to BigQuery
    const result = await saveChatMessages1(chatSession);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error saving chat:', error);
    return res.status(500).json({ error: 'Failed to save chat' });
  }
};


export default {
     saveChat,
     saveChat1,
     getChatHistory,
     getChatHistory1,
     getChatHistoryById
  
};