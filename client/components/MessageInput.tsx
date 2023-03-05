import { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import Emoji from "@/assets/svg/emoji.svg";
import Send from "@/assets/svg/send.svg";

const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

interface Props {
  onSetMessage: (message: string) => void;
}

export default function MessageInput({ onSetMessage }: Props) {
  const [content, setContent] = useState("");
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);

  const handleSendClick = () => {
    if (!content) {
      return;
    }
    onSetMessage(content);
    setContent("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleEmojiPickerClick = () => {
    setIsShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = ({ emoji }: EmojiClickData) => {
    setContent((prev) => prev + emoji);
    setIsShowEmojiPicker(false);
  };
  Send;
  return (
    <div className="flex">
      <input
        type="text"
        value={content}
        onChange={handleInputChange}
        onKeyUp={(e) => e.key === "Enter" && handleSendClick()}
        className="bg-navy-700 flex-1 py-2 px-4 outline-none"
      />
      <button
        onClick={handleEmojiPickerClick}
        className="bg-navy-700 w-12 flex justify-center items-center hover:brightness-95"
      >
        <Emoji width="18" height="18" fill="white" />
      </button>
      {isShowEmojiPicker && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            emojiStyle={EmojiStyle.GOOGLE}
          />
        </div>
      )}
      <button
        onClick={handleSendClick}
        className="bg-navy-700 w-12 flex justify-center items-center hover:brightness-95"
      >
        <Send width="18" height="18" fill="white" />
      </button>
    </div>
  );
}
