"use client";

import { useEffect, useState } from "react";

function shouldEnableMsw() {
  if (process.env.NEXT_PUBLIC_ENABLE_MSW === "false") {
    return false;
  }

  if (process.env.NEXT_PUBLIC_ENABLE_MSW === "true") {
    return true;
  }

  return process.env.NODE_ENV === "development";
}

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(!shouldEnableMsw());

  useEffect(() => {
    let mounted = true;

    async function startWorker() {
      if (!shouldEnableMsw()) {
        if (mounted) {
          setReady(true);
        }
        return;
      }

      const { worker } = await import("@/mocks/browser");

      await worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      });

      if (mounted) {
        setReady(true);
      }
    }

    startWorker();

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
