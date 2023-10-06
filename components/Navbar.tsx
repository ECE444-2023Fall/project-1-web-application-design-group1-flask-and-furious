import { Session } from '@supabase/gotrue-js';
import NavbarProfile from './NavbarProfile';

type Props = {
  session: Session | null;
};

function Navbar({ session }: Props) {
  return (
    <nav className="w-full flex flex-row border-b h-16 bg-white p-6">
      <div className="flex flex-row items-center">ClubHub</div>

      <div className="flex grow flex-row-reverse items-center">
        <NavbarProfile session={session} />
      </div>
    </nav>
  );
}

export default Navbar;
