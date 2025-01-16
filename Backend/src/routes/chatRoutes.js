import express from 'express';
import chatController from '../controllers/chatController.js';

const chatRoutes = express.Router();

// Routes

//chatRoutes.post('/save-chat', saveChat);
// chatRoutes.delete('/clear-history', clearHistory);
// chatRoutes.get('/summarize', summarizeConversation);
// chatRoutes.get('/chat-history', getChatHistory);
// chatRoutes.post('/save-chat', function(req, res){
//   chatController.saveChat
// });
chatRoutes.post('/save-chat',chatController.saveChat);
chatRoutes.post('/save-chat1',chatController.saveChat1);
chatRoutes.get('/chat-history',chatController.getChatHistory);
chatRoutes.get('/chat-history1',chatController.getChatHistory1);
chatRoutes.get('/chat-history/:chatId',chatController.getChatHistoryById);

export default chatRoutes;