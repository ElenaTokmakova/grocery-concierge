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

    // cleanup function
    return () => clearTimeout(timeoutId);
  }, [delay, isSynchronous, value]); // // Only re-run the effect if values change
  // If you use this optimization, make sure the array includes all values from the component scope
  // (such as props and state) that change over time and that are used by the effect. Otherwise, your code will reference stale values from previous renders.
  // If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. 
  // This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run. 

  return isSynchronous ? value : debouncedValue;
}
