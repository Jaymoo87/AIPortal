import { Router } from 'express';

import * as fs from 'fs';
import * as multer from 'multer';
import openai, { Configuration, OpenAIApi } from 'openai';

import config from '../../config';

const dalleRouter = Router();

const configuration = new Configuration({
  apiKey: config.openAI.API_KEY,
});

dalleRouter.post('/', async (req, res) => {
  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: req.body.message,
      n: 4,
      size: '1024x1024',
    });
    res.send(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
  }
});

// Multer to upload and temporarily store images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
//use storage object to define file source in response
const upload = multer({ storage: storage }).single('file');

let filePath: any;

dalleRouter.post('/upload', (req, res) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req?.file?.path);
    filePath = req?.file?.path;
  });
});

dalleRouter.post('/variations', async (req, res) => {
  filePath = req?.file?.path;
  try {
    const openai = new OpenAIApi(configuration);
    //@ts-ignore
    const response = await openai.createImageVariation(fs.createReadStream(filePath), 4, '1024x1024');
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
  }
});

export default dalleRouter;
