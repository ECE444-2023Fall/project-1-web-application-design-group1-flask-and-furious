export default function LoginForm() {
  return (
    <form
      className="flex w-full flex-col gap-2 text-foreground"
      action="/auth/sign-in"
      method="post"
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        data-testid="emailInput"
        className="mb-6 rounded-md border-2 border-neutral-400 bg-inherit px-4 py-2"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        data-testid="passwordInput"
        className="mb-6 rounded-md border-2 border-neutral-400 bg-inherit px-4 py-2"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button
        data-testid="loginButton"
        type="submit"
        className="mb-8 mt-4 rounded bg-primary px-4 py-2 font-bold text-white hover:bg-purple-900"
      >
        Sign In
      </button>
    </form>
  );
}
