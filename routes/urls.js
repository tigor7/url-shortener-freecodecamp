import { Router } from 'express';
import urlExist from 'url-exist';
import {URL} from 'url';
import Url from '../models/Url.js';
import Counter from '../models/Counter.js';

const router = Router();

router.post('/shorturl', async (req, res) => {

    const isValid = (s) => {
        try {
            new URL(s);
            return true;
          } catch (err) {
            return false;
          }
    }
    if (!isValid(req.body.url)) {
        return res.json({
            error: "Invalid URL"
        })
    }

     //check if the url is in the db

     const original_url = req.body.url;
     Url.findOne({original_url: original_url}, (err, url) => {
         if (err) return err;
         if(url) {
             return res.json({
                 original_url: url.original_url,
                 short_url: url.short_url
             });
         }

        //check if the url exists
        const urlExists = urlExist(req.body.url)
        if (!urlExists) {
            console.log('exists url res sent')
            return res.json({
                error: "Invalid Hostname"
            });
        }

        Counter.findOneAndUpdate({}, {$inc: {counter: 1}}, async (err, doc) => {
            if(err) return err;
            const short_url = doc.counter;

            const url = new Url({
                original_url: original_url,
                short_url: short_url,
            });
            url.save((err) => {
                if (err) return err;
                return res.send({
                    original_url: original_url,
                    short_url: short_url,
                });
            });
        }); 
     });
 
  
});

router.get('/shorturl/:id', (req, res) => {
    Url.findOne({short_url: req.params.id}, (err, url) => {
        if(err) console.log(err);
        if(!url) {
            return res.json({
                error: 'No short URL found for the given input'
            });
        }
        res.json({
            original_url: url.original_url,
            short_url: url.short_url,
        });
    });
});

export default router;