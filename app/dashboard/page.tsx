import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import SignOutButton from "./signout-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            You’re not signed in
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Please sign in to access the dashboard.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/signin"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Signed in as <span className="font-medium">{session.user.email}</span>
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-50">
          <div className="font-medium">User</div>
          <div className="mt-2 grid gap-1 text-zinc-700 dark:text-zinc-200">
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Name:</span>{" "}
              {session.user.name || "—"}
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Id:</span>{" "}
              {session.user.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

