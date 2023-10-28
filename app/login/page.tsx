import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import Messages from './messages';

export default function Login() {
  return (
    <div className="flex w-full flex-1 flex-col gap-2 px-8 sm:max-w-md">
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
      <LoginForm />
      <Messages />
      <div className="mt-2 flex">
        <p className=""> Don&apos;t have an account? </p>
        <Link
          href="/register"
          className="text-foreground bg-btn-background hover:bg-btn-background-hover text-md rounded-md px-2 font-bold text-purple-700 no-underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
