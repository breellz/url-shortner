import express, { Request, Response } from 'express'

const router = express.Router();

router.post('/shortener', async (req: Request, res: Response) => {
    const { url } = req.body;
    
})

module.exports = router;