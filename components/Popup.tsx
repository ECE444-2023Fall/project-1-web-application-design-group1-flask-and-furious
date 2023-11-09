import { XCircleIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

interface PopupProps {
  message: string;
  type: 'error' | 'success';
  setMessage: Dispatch<SetStateAction<string>>;
}

export default function Popup(props: PopupProps) {
  const backgroundColor =
    props.type === 'error' ? 'bg-red-500' : 'bg-green-500';

  const closePopup = () => {
    props.setMessage('');
  };

  if (props.message) {
    return (
      <div
        className={`z-50 mx-4 mt-4 min-w-[240px] max-w-xl grow p-2 ${backgroundColor} rounded-lg text-white`}
        role="alert"
      >
        <div className="flex justify-between">
          <span>{props.message}</span>
          <button onClick={closePopup} className="focus:outline-none">
            <XCircleIcon className="ml-2 h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
