import { z } from 'zod';

// 入力したメッセージのカジュアル度を判定するAPI
export default interface MessageEvaluateRequestData {
  message: string;
}

export const MessageEvaluateRequestDataScheme = z.object({
  message: z.string(),
});

export function MessageEvaluateRequestDataValidate(data: MessageEvaluateRequestData): void | never {
  if (data.message === '') {
    throw new Error('メッセージが空です');
  }
}
