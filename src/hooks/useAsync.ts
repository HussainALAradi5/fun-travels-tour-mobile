import { useCallback, useEffect, useRef, useState } from "react";
import type { AsyncState } from "@/interfaces/common/AsyncState";
import { errorMessage } from "@/utilities/errors";

/** Loads data on mount and whenever the loader changes; exposes reload for pull-to-refresh. */
export function useAsync<T>(loader: () => Promise<T>, enabled = true): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const active = useRef(true);

  const reload = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const result = await loader();
      if (active.current) setData(result);
    } catch (e) {
      if (active.current) setError(errorMessage(e));
    } finally {
      if (active.current) setLoading(false);
    }
  }, [loader, enabled]);

  useEffect(() => {
    active.current = true;
    if (enabled) {
      loader()
        .then((result) => active.current && setData(result))
        .catch((e) => active.current && setError(errorMessage(e)))
        .finally(() => active.current && setLoading(false));
    }
    return () => {
      active.current = false;
    };
  }, [loader, enabled]);

  return { data, loading, error, reload };
}
