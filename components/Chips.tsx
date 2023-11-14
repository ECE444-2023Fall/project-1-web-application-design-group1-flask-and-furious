type Props = {
  tags: Record<string, boolean>;
  setSelectedTags: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

const Chips = ({ tags, setSelectedTags }: Props) => {
  return (
    <div className="flex flex-wrap gap-1">
      {Object.keys(tags).map((tag) =>
        tags[tag] ? (
          <button
            className="btn btn-primary btn-active max-w-[100px] rounded-full !border-transparent !bg-pink-600 text-white hover:!bg-pink-600/80"
            key={tag}
            onClick={() => {
              setSelectedTags((prev) => ({ ...prev, [tag]: !prev[tag] }));
            }}
          >
            {tag}
          </button>
        ) : null
      )}
    </div>
  );
};

export default Chips;
