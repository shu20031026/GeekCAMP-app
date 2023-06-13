import MessageEvaluateRequestData from '../../interfaces/message/evaluate/POST/Request';
import MessageEvaluateResponseData from '../../interfaces/message/evaluate/POST/Response';
import { generateText } from './generateText';

const prompt =
  '次のメッセージがどの程度カジュアルかを最大限フォーマルな場合を100として単位を付けずnumber型の数値のみで返してください。';

export async function GenerateMessageEvaluate(message: string): Promise<number | undefined> {
  const content = `${prompt}「${message}」`;
  try {
    const response = await generateText(content);
    return Number(response);
  } catch (error) {
    console.error(error);
    return;
  }
}
