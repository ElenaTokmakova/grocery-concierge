import {useState, useEffect} from 'react';

/**
 * Debounces the provided value in render. If `delay`
 * is zero, the value is updated synchronously.
 * @param {T} value
 * @param {Number} delay
 * @return {T}
 */
export default function useDebounced(value, delay = 300) {
  const isSynchronous = delay === 0;

  // We initialize the state intentionally with `undefined`, so that the
  // first actual value is only set when the first timer has finished.
  const [debouncedValue, setDebouncedValue] = useState(undefined);

  useEffect(() => {
    // We still need to set the debounced value, even if it was returned
    // synchronously. When the delay increases, we need to be able to return
    // the previous value until the new one is applied.
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, isSynchronous, value]);

  return isSynchronous ? value : debouncedValue;
}
