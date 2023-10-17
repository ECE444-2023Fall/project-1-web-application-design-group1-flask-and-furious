'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Register() {
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password === retypePassword) {
      try {
        const response = await fetch('/auth/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
          })
        });

        if (response.ok) {
          router.push('/confirm');
        } else {
          const data = await response.json();
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage('Error.');
      }
    } else {
      setErrorMessage('Passwords do not match. Please try again.');
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-2 px-8 sm:max-w-xl">
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover text-md top-18 group absolute left-2 flex items-center rounded-md px-4 py-2 no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>
      <p className="mb-16 mt-16 text-center text-3xl font-bold">
        {' '}
        What&apos;s Litty In Your City?{' '}
      </p>
      <form
        className="text-foreground flex w-full flex-col gap-2"
        action="/auth/sign-up"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 flex">
          <div className="mr-4">
            <label className="text-md">First Name</label>
            <input
              className="w-full rounded-md border-2 border-neutral-400 bg-inherit px-4 py-2"
              name="firstName"
              placeholder="John"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-md">Last Name</label>
            <input
              className="w-full rounded-md border-2 border-neutral-400 bg-inherit px-4 py-2"
              name="lastName"
              placeholder="Doe"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border-2 border-neutral-400 bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border-2 border-neutral-400 bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="text-md" htmlFor="retypepassword">
          Re-type Password
        </label>
        <input
          className="mb-6 rounded-md border-2 border-neutral-400 bg-inherit px-4 py-2"
          type="password"
          name="retypepassword"
          placeholder="••••••••"
          required
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
        />
        {errorMessage && (
          <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="mb-2 mt-4 rounded bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-900"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-2 flex">
        <p className=""> Already have an account? </p>
        <Link
          href="/login"
          className="text-foreground bg-btn-background hover:bg-btn-background-hover text-md rounded-md px-2 font-bold text-purple-700 no-underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}