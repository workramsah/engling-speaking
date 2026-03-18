"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => {
    const normalizedEmail = email.trim();
    return (
      name.trim().length > 0 &&
      normalizedEmail.length > 3 &&
      normalizedEmail.includes("@") &&
      password.length >= 8
    );
  }, [name, email, password]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedName = name.trim();
      const normalizedImage = image.trim();

      const result = await authClient.signUp.email(
        {
          email: normalizedEmail,
          password,
          name: normalizedName,
          image: normalizedImage.length ? normalizedImage : undefined,
          callbackURL: "/dashboard",
        },
        {
          onError: (ctx: any) => {
            throw new Error(ctx?.error?.message || "Sign up failed");
          },
        }
      );

      if ((result as any)?.error) {
        throw new Error((result as any).error?.message || "Sign up failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Sign up with email and password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:ring-indigo-900/40"
              required
            />
          </div>

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
              placeholder="Minimum 8 characters"
              type="password"
              autoComplete="new-password"
              minLength={8}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:ring-indigo-900/40"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Image URL (optional)
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              autoComplete="off"
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:ring-indigo-900/40"
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
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <a className="font-medium text-indigo-600 hover:underline" href="/signin">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}