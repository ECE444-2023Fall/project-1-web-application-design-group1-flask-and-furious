'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function RegisterForm() {
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
    <form
      className="text-foreground flex w-full flex-col gap-2"
      action="/auth/sign-up"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 flex">
        <div className="mr-4">
          <label className="text-md" htmlFor="firstName">
            First Name
          </label>
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
          <label className="text-md" htmlFor="lastName">
            Last Name
          </label>
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
      <button
        type="submit"
        className="mb-8 mt-4 rounded bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-900"
      >
        Sign Up
      </button>

      {errorMessage && (
        <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
      )}
    </form>
  );
}
