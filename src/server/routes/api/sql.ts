import { Request, Response, Router } from 'express';

import { Configuration, OpenAIApi } from 'openai';
import config from '../../config';

const sqlRouter = Router();

const configuration = new Configuration({
  apiKey: config.openAI.API_KEY,
});

const openai = new OpenAIApi(configuration);

sqlRouter.post('/', async (req: Request, res: Response) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Create a SQL request in SQL format to ' + req.body.message }],
    });
    res.send(response.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send('server error');
  }
});

export default sqlRouter;
