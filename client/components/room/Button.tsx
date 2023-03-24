interface Props {
  bgColor: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ bgColor, onClick, children }: Props) {
  return (
    <button
      className={`bg-${bgColor} w-full p-2 mt-2 rounded-sm relative active:top-[1px] hover:brightness-95`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
