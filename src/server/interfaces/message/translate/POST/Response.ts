import { z } from 'zod';

export default interface MessageTranslateResponseData {
  message: string;
}

export const MessageTranslateResponseDataScheme = z.object({
  message: z.string(),
});
