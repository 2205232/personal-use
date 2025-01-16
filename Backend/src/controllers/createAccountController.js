import { createAccount} from '../models/bigQueryModel.js';


// POST route to handle account creation
 const createAccountRoutes= (async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
  
      // Call the service that handles BigQuery data insertion
      await createAccount({ firstName, lastName, email, password });
  
      res.status(200).json({ message: 'Account created successfully' });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ message: 'Failed to create account', error });
    }
  });

export default {
    createAccountRoutes,   
};