import * as dotenv from 'dotenv';

dotenv.config();

export default {
  openAI: {
    API_KEY: process.env.OPENAI_API_KEY!,
  },
};
