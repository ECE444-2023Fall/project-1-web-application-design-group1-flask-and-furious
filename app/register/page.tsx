import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col gap-2 px-8 sm:max-w-xl">
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
      <RegisterForm />
      <div className="mt-2 flex pb-10">
        <p className=""> Already have an account? </p>
        <Link
          href="/login"
          className="text-foreground bg-btn-background hover:bg-btn-background-hover text-md rounded-md px-2 font-bold text-primary no-underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
