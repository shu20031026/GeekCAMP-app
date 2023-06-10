import { z } from 'zod';

export default interface HelloPostRequestData {
  name: string;
}

export const HelloRequestDataScheme = z.object({
  name: z.string(),
});

export function HelloRequestDataValidate(data: HelloPostRequestData): void | never {
  if (data.name === '') {
    throw new Error('名前が空です');
  }
}
