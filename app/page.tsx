export default async function Home() {
  return (
    <div className="flex h-full w-screen flex-col items-center justify-center bg-violet-50">
      <div className="group relative">
        <div className="absolute -inset-0.5 animate-tilt rounded-lg bg-violet-600 bg-gradient-to-r from-pink-600 to-violet-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
        <div className="relative rounded-lg bg-violet-100 px-7 py-4">
          <h1 className="scroll-m-20 text-9xl font-extrabold tracking-tighter">
            Club
            <span className="animate-text bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text px-5 py-2 text-transparent">
              Hub
            </span>
          </h1>
          <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            What&apos;s{' '}
            <span className="underline underline-offset-1">Litty</span> in Your{' '}
            <span className="underline underline-offset-1">City</span>?
          </h3>
        </div>
      </div>
    </div>
  );
}
