import { Session } from '@supabase/gotrue-js';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

type Props = {
  session: Session | null;
};

function Navbar({ session }: Props) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        {session ? (
          <div className="flex items-center gap-4">
            Hey, {session.user.email}!
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
