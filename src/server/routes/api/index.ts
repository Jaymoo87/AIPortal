import { Router } from 'express';
import gptRouter from './gpt';
// import dalleRouter from './dalle';

const apiRouter = Router();

apiRouter.use('/gpt', gptRouter);
// apiRouter.use('/dalle', dalleRouter);

export default apiRouter;
