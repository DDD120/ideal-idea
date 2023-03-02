import { MouseEvent, useRef } from "react";

interface Props {
  onSetMessage: (message: string) => void;
}

export default function MessageInput({ onSetMessage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = inputRef.current?.value;
    if (!message) {
      return;
    }
    onSetMessage(message);
    inputRef.current.value = "";
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>확인</button>
    </div>
  );
}
