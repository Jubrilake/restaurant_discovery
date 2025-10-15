// src/hooks/useRestaurantSearch.ts
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

export function useRestaurantSearch(initial = "") {
  const [query, setQuery] = useState(initial);

  const debouncedTrigger = useMemo(
    () =>
      debounce((value: string, callback: (val: string) => void) => {
        callback(value);
      }, 300),
    []
  );

  const onChange = (value: string, onDebounced: (val: string) => void) => {
    setQuery(value);
    debouncedTrigger(value, onDebounced);
  };

  useEffect(() => {
    return () => {
      debouncedTrigger.cancel();
    };
  }, [debouncedTrigger]);

  return { query, setQuery, onChange };
}
