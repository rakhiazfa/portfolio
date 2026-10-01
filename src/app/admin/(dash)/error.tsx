"use client";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="rounded-xl border border-red-500/40 p-6">
      <p className="font-semibold text-red-600 dark:text-red-400">Something went wrong</p>
      <p className="mt-1 text-sm text-muted">{error.message}</p>
      <button className="btn-ghost mt-4" onClick={reset}>Try again</button>
    </div>
  );
}
