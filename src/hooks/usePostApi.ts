import { useCallback, useState } from 'react';

export const usePostApi = <T, U>(url: string) => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLording, setIsLording] = useState<boolean>(false);

  const postApi = useCallback(
    async (reqBody: U | null) => {
      const param = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      };

      setIsLording(true);
      const res = await fetch(url, param);
      if (!res.ok) {
        console.error(res);
        setError(true);
        setIsLording(false);
        return;
      }
      const json: T = await res.json();
      setResponseData(json);
      setError(false);
      setIsLording(false);
      return json;
    },
    [url],
  );
  return { responseData, error, isLording, postApi };
};
