import { useCallback, useEffect, useRef } from 'react';

export const useFirstRender = () => {
  const isFirstRef = useRef(true);

  useEffect(() => {
    isFirstRef.current = false;
  }, []);

  const isFirst = useCallback(() => isFirstRef.current, []);

  return isFirst;
};
