import { openai } from './openaiConfig';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

const AI_MODEL = 'gpt-3.5-turbo';

export async function generateText(content: string): Promise<string | undefined> {
  try {
    const response = await openai.createChatCompletion({
      model: AI_MODEL,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content,
        },
      ],
    });
    const answer = response.data.choices[0].message?.content;
    return answer;
  } catch (error) {
    console.error(error);
  }
}
