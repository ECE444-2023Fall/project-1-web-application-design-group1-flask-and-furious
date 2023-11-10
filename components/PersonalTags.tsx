import { ProfileData } from '@/app/profile/types';

type Props = {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  tags: ProfileData['tags'];
  setTags: (tags: ProfileData['tags']) => void;
  onSaveClick: () => void;
  onEditClick: () => void;
  tagOptions: string[] | null;
};

const PersonalTags = ({
  edit,
  setEdit: setProfileEdit,
  tags,
  setTags,
  onSaveClick,
  onEditClick,
  tagOptions
}: Props) => {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;

    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    selectedValues.sort((a, b) => a.localeCompare(b));
    setTags(selectedValues);
  };

  return (
    <>
      <div className="ml-2 mt-3 flex flex-grow basis-2/4">
        <div className="m-2 flex flex-grow flex-col rounded bg-white">
          {edit ? (
            <select
              multiple
              size={6}
              value={(tags as string[]) ?? []}
              onChange={handleSelectionChange}
              className="mt-2 max-w-full rounded-md border-2 border-gray-300 p-1 text-lg"
            >
              {(tagOptions ?? []).sort().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <p className="mt-1 text-lg">
              {tags ? (
                Object.entries(tags).flatMap(([key, value], index, array) => [
                  <span key={key}>{value}</span>,
                  index < array.length - 1 && (
                    <span key={key + '_comma'}>, </span>
                  )
                ])
              ) : (
                <span></span>
              )}
            </p>
          )}
        </div>
      </div>
      <div className="mb-2 flex flex-grow basis-1/4 items-end justify-end rounded-b-lg">
        {edit ? (
          <>
            <button
              className="mr-2 rounded bg-primary px-4 py-2 text-white hover:bg-purple-900"
              onClick={onSaveClick}
            >
              Save
            </button>
            <button
              className="mr-2 rounded bg-primary px-4 py-2 text-white hover:bg-purple-900"
              onClick={() => setProfileEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className=" mr-2 rounded bg-primary px-4 py-2 text-white hover:bg-purple-900"
            onClick={onEditClick}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default PersonalTags;
