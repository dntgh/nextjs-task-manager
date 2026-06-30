import { useEffect, useState } from 'react';

/**
 * Debounces a value by the given delay (ms).
 * Returns the debounced value only after the user has stopped changing it.
 */
export default function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
