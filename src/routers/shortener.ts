import  { Request, Response, Router } from 'express'
import { isUri } from 'valid-url'
import { generate } from 'shortid'

import { Url } from '../models/url'

const baseUrl: string = 'http:localhost:5000'

const router = Router();

router.post('/shorten', async (req: Request, res: Response) => {
    const  longUrl:string = req.body.url;

    //check if url is validUrl
    if (!isUri(baseUrl)) {
        return res.status(400).send('Invalid URL');
    }

    const urlCode:string = generate()

    if(isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })
            if(url) {
                res.send(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
            const newUrl = new Url({
                longUrl,
                urlCode,
                shortUrl,
                date: new Date()
            })
            await newUrl.save()
            res.send(newUrl)
            }
        } catch (err) {
            res.status(500).send('server error')
        }
    } else {
        res.status(400).send('invalid request')
    }
    
})

router.post('/:code', async(req:Request, res: Response) => {
    try {
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if(url) {
          return  res.redirect(url.longUrl)
        } else {
            return res.status(404).send('url not found')
        }
    } catch (error: any) {
        return res.status(500).send('server error')
    }
})
export default router;