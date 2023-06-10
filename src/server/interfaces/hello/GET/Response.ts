import { z } from 'zod';

export default interface HelloGetResponseData {
  text: string;
}

export const HelloResponseDataScheme = z.object({
  text: z.string().describe('message'),
});
