import { useCallback, useRef } from 'react';

export const useScrollToElement = <T extends HTMLElement>() => {
  const scrollElementRef = useRef<T>(null);

  const scrollToElement = useCallback(() => {
    const element = scrollElementRef.current;

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { scrollElementRef, scrollToElement } as const;
};
