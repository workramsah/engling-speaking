"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    const normalizedEmail = email.trim();
    return normalizedEmail.includes("@") && password.length > 0;
  }, [email, password]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const result = await authClient.signIn.email(
        { email: normalizedEmail, password, callbackURL: "/dashboard" },
        {
          onError: (ctx: any) => {
            throw new Error(ctx?.error?.message || "Sign in failed");
          },
        }
      );

      if ((result as any)?.error) {
        throw new Error((result as any).error?.message || "Sign in failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in with your email and password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:ring-indigo-900/40"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              type="password"
              autoComplete="current-password"
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:ring-indigo-900/40"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            New here?{" "}
            <a className="font-medium text-indigo-600 hover:underline" href="/signup">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

