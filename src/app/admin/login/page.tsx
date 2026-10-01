"use client";
import { useActionState } from "react";
import { login } from "../actions";

export default function Login() {
  const [error, action, pending] = useActionState(login, undefined);
  return (
    <main className="grid flex-1 place-items-center px-4">
      <form action={action} className="w-full max-w-sm space-y-4 rounded-xl border border-line bg-card p-6">
        <h1 className="text-xl font-semibold">Admin</h1>
        <label className="block text-sm">
          Email
          <input name="email" type="email" required autoComplete="username" className="input mt-1" />
        </label>
        <label className="block text-sm">
          Password
          <input name="password" type="password" required autoComplete="current-password" className="input mt-1" />
        </label>
        {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button className="btn w-full justify-center" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
