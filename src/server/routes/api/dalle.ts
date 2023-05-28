import { Router } from 'express';

import config from '../../config';

import { Configuration, OpenAIApi } from 'openai';

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

export default dalleRouter;
