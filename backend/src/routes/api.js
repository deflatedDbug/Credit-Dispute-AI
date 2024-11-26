import express from "express";
import generate_dispute_letter from "../services/generate_dispute.js"

const router = express.Router();

router.post('/generate-letter', async (req,res) => {
    const { name, address, disputeDetails } = req.body;

    if (!name || !address || !disputeDetails) {
        return res.status(400).json({message: 'Missing required fields: name, address, disputeDetails'})
    }
    try { 
        const letter = await generate_dispute_letter({name, address, disputeDetails});
        res.status(200).json({ letter })
    }
    catch(error) {
        res.status(500).json({ message: error.message })
    }
});

export default router;

