import { Dispatch, SetStateAction } from 'react';

export const pasteText = async (setText: Dispatch<SetStateAction<string>>) => {
  const clipboardData = await navigator.clipboard.readText();

  setText(clipboardData);
};
