import { z } from 'zod';

// 入力したメッセージをカジュアル(フォーマル)に変換するAPI
export default interface MessageTranslateRequestData {
  message: string;
  casualValue: number;
}

export const MessageTranslateRequestDataScheme = z.object({
  message: z.string(),
  casualValue: z.number().min(0).max(100).int(), // 0 <= casualValue <= 100 の整数
});

export function MessageEvaluateRequestDataValidate(data: MessageTranslateRequestData): void | never {
  if (data.message === '') {
    throw new Error('メッセージが空です');
  }
}
