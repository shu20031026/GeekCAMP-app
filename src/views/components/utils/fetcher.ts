import { z } from 'zod';

export const validateFetcher =
  <T>(schema: z.ZodType<T, any, any>) =>
  (input: RequestInfo, requestInit: RequestInit = {}): Promise<T> =>
    fetch(input, requestInit)
      .then((res) => res.json())
      .then((data) => {
        const result = schema.safeParse(data);
        if (!result.success) {
          throw result.error;
        }
        return result.data;
      });
