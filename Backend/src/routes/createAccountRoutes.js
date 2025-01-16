import express from 'express';
import createAccountController from '../controllers/createAccountController.js';

const createAccountRoutes = express.Router();

chatRoutes.post('/create-account',chatController.createAccount);


export default createAccountRoutes;