import { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import Emoji from "@/public/svg/emoji.svg";
import Send from "@/public/svg/send.svg";

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
    <div className="flex relative">
      <input
        type="text"
        value={content}
        onChange={handleInputChange}
        onKeyUp={(e) => e.key === "Enter" && handleSendClick()}
        className="bg-navy-700 w-full py-2 px-4 outline-none"
      />
      <button
        onClick={handleEmojiPickerClick}
        className="bg-navy-700 shrink-0 w-10 flex justify-center items-center hover:brightness-95"
      >
        <Emoji width="18" height="18" fill="white" />
      </button>
      {isShowEmojiPicker && (
        <div className="absolute bottom-10">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            emojiStyle={EmojiStyle.GOOGLE}
          />
        </div>
      )}
      <button
        onClick={handleSendClick}
        className="bg-navy-700 shrink-0 w-10 flex justify-center items-center hover:brightness-95"
      >
        <Send width="18" height="18" fill="white" />
      </button>
    </div>
  );
}
