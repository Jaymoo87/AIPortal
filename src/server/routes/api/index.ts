import { Router } from 'express';

import gptRouter from './gpt';
import dalleRouter from './dalle';
import sqlRouter from './sql';

const apiRouter = Router();

apiRouter.use('/gpt', gptRouter);
apiRouter.use('/dalle', dalleRouter);
apiRouter.use('/sql', sqlRouter);

export default apiRouter;
