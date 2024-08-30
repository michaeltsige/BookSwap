import express, { response } from 'express';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

//route for sign up
router.post('/signup',async (request,response)=>{

    try{
        const {username, email, password} =  request.body;
        const userCheck = await User.findOne({email: email});
    
        if(userCheck){
            
            return response.json({message: "user already exist"});
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

export default router;