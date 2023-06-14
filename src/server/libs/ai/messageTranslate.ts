import { generateText } from './generateText';

const prompt = '';

export async function GenerateMessageTranslate(message: string, casualValue: number): Promise<string | undefined> {
  const content = `${prompt} ${casualValue}「${message}」`;
  try {
    const response = await generateText(content);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}
