import { z } from 'zod';

export default interface MessageEvaluateResponseData {
  casualValue: number;
}

export const MessageEvaluateResponseDataScheme = z.object({
  casualValue: z.number().min(0).max(100).int(), // 0 <= casualValue <= 100 の整数
});
