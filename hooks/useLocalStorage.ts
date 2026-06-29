import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 1. Initialize state with initialValue to keep server and client initial HTML synchronized
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 2. This useEffect runs ONLY once on the client side after the component has mounted
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
    }
  }, [key]); // Only run on component mount

  // 3. This useEffect synchronizes the state back to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: T) => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

export default useLocalStorage;