import { useMemo } from "react";
import { debounce } from "lodash/function";
import useLatest from "use-latest";

export const UseDebounce = (cb, ms) => {
  const latestCb = useLatest(cb);

  return useMemo(
    () =>
      debounce((...args) => {
        latestCb.current(...args);
      }, ms),
    [latestCb, ms]
  );
};
