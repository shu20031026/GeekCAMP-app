import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';

// .env.local ファイルにAPI Keyを設定する
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
