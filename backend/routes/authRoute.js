import express from 'express';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

//route for sign up
router.post('/signup',async (request,response)=>{

    try{
        const {username, email, password} =  request.body;
        const userCheck = await User.findOne({email: email});
    
        if(userCheck){
            console.log(userCheck);
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
        console.log(error);
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
        const JWT_SECRET = 'your_jwt_secret_key';

        const token = jwt.sign(
            { username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        return response.status(200).json({ userPageData, token });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: error.message })
    }
});

export default router;