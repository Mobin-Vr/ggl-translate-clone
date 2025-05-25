// useTextareaSyncHeight.js
import { useEffect } from "react";
import autosize from "autosize";

export function useTextareaSyncHeight(ref1, ref2, deps = []) {
  useEffect(() => {
    if (!ref1.current || !ref2.current) return;

    autosize(ref1.current);
    autosize(ref2.current);

    autosize.update(ref1.current);
    autosize.update(ref2.current);

    const h1 = ref1.current.scrollHeight;
    const h2 = ref2.current.scrollHeight;
    const max = Math.max(h1, h2);

    ref1.current.style.height = `${max}px`;
    ref2.current.style.height = `${max}px`;
  }, deps);
}
