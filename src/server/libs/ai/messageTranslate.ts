import { generateText } from './generateText';

export async function GenerateMessageTranslate(message: string, casualValue: number): Promise<string | undefined> {
  const content = `次の文章をビジネスの場で使う想定でもう少しカジュアルに変換してください。 条件:最大限フォーマルな場合を100%として${casualValue}程度で。「${message}」`;
  try {
    const response = await generateText(content);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}
