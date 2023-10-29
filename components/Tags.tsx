import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const Tags = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data } = await supabase.from('Tags').select();

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        Tags
      </label>
      <ul
        tabIndex={0}
        className="w-30 scrollbar-hide menu dropdown-content rounded-box z-[1] h-[200px] flex-col flex-nowrap overflow-hidden overflow-y-scroll bg-base-100 p-2 shadow"
      >
        {data?.map((tag) => (
          <li key={tag.id}>
            <a>{tag.tag}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
