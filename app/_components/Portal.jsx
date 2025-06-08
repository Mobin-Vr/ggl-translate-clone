"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Avoid rendering on the server (to prevent hydration mismatch)
  return mounted
    ? createPortal(children, document.getElementById("portal-root"))
    : null;
}
