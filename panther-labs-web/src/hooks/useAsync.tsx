import { useCallback, useEffect, useState } from "react";

export function useAsync<T>(func: Function, dependencies: Array<T> = []) {
  const { execute, ...state } = useAsyncInternal<T>(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn<T>(func: Function, dependencies: Array<T> = []) {
  return useAsyncInternal<T>(func, dependencies, false);
}

function useAsyncInternal<T>(
  func: Function,
  dependencies: Array<T>,
  initialLoading = false,
) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState();
  const [value, setValue] = useState<any>();

  const execute = useCallback((...params: T[]) => {
    setLoading(true);
    return func(...params)
      .then((data: any) => {
        setValue(data);
        setError(undefined);
        setLoading(false);
        return data;
      })
      .catch((error: any) => {
        setError(error);
        setValue(undefined);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { loading, error, value, execute };
}
