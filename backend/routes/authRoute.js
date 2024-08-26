import express from 'express';
import { User } from '../models/userModel';

const router = express.Router();

//route for sign up
router.post('/signup',async (request,response)=>{
    const {username, email, password} =  request.body;
    

})


export default router;