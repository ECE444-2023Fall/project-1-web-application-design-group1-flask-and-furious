'use client';

import { useSearchParams } from 'next/navigation';

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  return (
    <>
      {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
      {message && <div className="mb-4 text-sm text-red-500">{message}</div>}
    </>
  );
}
