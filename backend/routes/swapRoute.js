import express, { request, response } from 'express';
import { Swap } from '../models/swapModel.js';

const router = express.Router();

// get all swap requests
router.get('/',async(request, response)=>{
    try {
        const swaps = await Swap.find({});

        return response.status(200).json({
            count: swaps.length,
            data: swaps,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

//route to add swap request
router.post('/', async (request, response) => {
    try {
      const { requester, requestee, bookRequestedId, bookOfferedId, bookRequestedName, bookOfferedName, status } = request.body;
  
      // Check if a similar request already exists
      const existingSwap = await Swap.findOne({
        requester,
        requestee,
        bookRequestedId,
        bookOfferedId,
      });
  
      if (existingSwap) {
        return response.status(409).json({ message: 'A similar swap request already exists.' });
      }
  
      // Create a new swap request
      const newSwap = {
        requester,
        requestee,
        bookRequestedId,
        bookOfferedId,
        bookRequestedName,
        bookOfferedName,
        status,
      };
  
      const swap = await Swap.create(newSwap);
      return response.status(201).json({ message: 'Swap request created successfully.' });
  
    } catch (error) {
      console.log(error);
      return response.status(500).send({ message: error.message });
    }
  });

//route to get requests made, using the requester

router.get('/requestsMade/:requester',async (request,response)=>{
    try{

        const { requester } = request.params;
        const requestsMade = await Swap.find({requester: requester});

        return response.status(200).json({
            count: requestsMade.length,
            data: requestsMade,
          });

    } catch(error){
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

//route to get requests made, using the requestee

router.get('/seeRequests/:requestee', async(request, response)=>{

    try {

        const { requestee } = request.params;
        const requestsRecieved = await Swap.find({requestee: requestee});

        return response.status(200).json({
            count: requestsRecieved.length,
            data: requestsRecieved,
          });

    } catch(error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

//accept request
router.put('/accept/:id',async (request,response)=>{
    try {

        const { id } = request.params;
        const result = await Swap.findByIdAndUpdate(id, {status: 'accepted'}, { new: true } );
        console.log(result);

        if (!result) {
            return response.status(404).json({ message: 'Swap Request not found' });
          }
      
        return response.status(200).send({ message: 'Swap Request accepted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//reject request
router.put('/reject/:id',async (request,response)=>{
    try {

        const { id } = request.params;
        const result = await Swap.findByIdAndUpdate(id, {status: 'rejected'}, { new: true } );
        console.log(result);

        if (!result) {
            return response.status(404).json({ message: 'Swap Request not found' });
          }
      
        return response.status(200).send({ message: 'Swap Request rejected successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
