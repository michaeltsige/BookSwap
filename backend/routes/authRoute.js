import express, { response } from 'express';
import { User } from '../models/userModel.js';
import { Book } from '../models/bookModel.js';
import { Swap } from '../models/swapModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

//route for sign up
router.post('/signup',async (request,response)=>{

    try{
        const {username, email, password} =  request.body;
        const emailCheck = await User.findOne({email: email});
    
        if(emailCheck){
            
            return response.status(409).json({message: "email exists"});
        }

        const usernameCheck = await User.findOne({username: username});

        if(usernameCheck){
            
            return response.status(409).json({message: "username exists"});
        }
    
        const newUser = new User({
            username: username,
            email: email,
            password: password,
        });
    
        const user = await User.create(newUser);
        return response.status(201).json({message: 'created'});
    } catch (error) {
        
        return response.status(500).json({message: error.message});
    }

});

//route for login
router.post('/login',async (request,response)=>{
    try {

        const { username, password } = request.body;
        const user = await User.findOne({username});

        if(!user){
            return response.json({message: 'No user found'});
        }

        const validPassword = (password === user.password);

        if(!validPassword){
            return response.json({message : 'invalid password'});
        }

        const userPageData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        // store in config file the process env later
        

        const token = jwt.sign(
            { username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        return response.status(200).json({ userPageData, token });

    } catch (error) {
        
        return response.status(500).json({ message: error.message })
    }
});

//route for getting contact details/email from username
//Maybe make it into a post request later for better security

router.get('/getContact/:username', async (request,response)=>{
    try {

        const { username } = request.params;
        
        const user = await User.findOne({username: username});
        const contact = user.email; 
        response.status(201).json({contact: contact});

    } catch (error) {
        return response.json({message: error.message});
    }
});


router.delete('/delete/:username', async (req, res) => {    
    const { username } = req.params;
  
    try {
      // Delete the user's books
      await Book.deleteMany({ ownerUsername: username });
  
      // Delete the user's swap requests
      await Swap.deleteMany({ $or: [{ requester: username }, { requestee: username }] });
  
      // Delete the user
      const result = await User.findOneAndDelete({ username: username });
  
      if (result) {
        res.status(200).json({ message: 'User and related documents deleted', result });
      } else {
        res.status(404).json({ message: 'No user found with that username' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    //   console.log(error.message);
    }
});

export default router;