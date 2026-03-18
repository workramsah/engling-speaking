"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    if (loading) return;
    setLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onError: () => {
            // ignore and still refresh; stale cookies will be cleared if possible
          },
        },
      } as any);
    } finally {
      router.push("/signin");
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}

