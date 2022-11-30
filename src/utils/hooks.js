import { isEqual } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

function deepCompareEquals(a, b) {
  return isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  const ref = useRef()

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export function useDeepCompareMemo(callback, dependencies) {
  return useMemo(
    callback,
    dependencies.map(useDeepCompareMemoize),
  )
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback],
  );

  useEffect(
    () => {
      const handler = (...args) => savedCallback.current(...args);

      if (delay !== null) {
        const id = setInterval(handler, delay);
        return () => clearInterval(id);
      }
    },
    [delay],
  );
};

export default useInterval;
