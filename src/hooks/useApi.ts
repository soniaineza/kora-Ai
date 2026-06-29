import { useState, useEffect, useRef } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const fetch = () => {
    setLoading(true);
    setError(null);
    fetcherRef.current()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'An error occurred'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch() }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: fetch };
}

export function useMutation<T, R>(
  mutator: (data: T) => Promise<R>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: T): Promise<R | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await mutator(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
