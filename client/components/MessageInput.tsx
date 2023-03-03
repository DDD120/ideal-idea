import { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import { EmojiClickData, EmojiStyle } from "emoji-picker-react";

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
    setIsShowEmojiPicker(true);
  };

  const handleEmojiClick = ({ emoji }: EmojiClickData) => {
    setContent((prev) => prev + emoji);
    setIsShowEmojiPicker(false);
  };

  return (
    <div>
      <input type="text" value={content} onChange={handleInputChange} />
      <button onClick={handleEmojiPickerClick}>이모지</button>
      {isShowEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          emojiStyle={EmojiStyle.GOOGLE}
        />
      )}
      <button onClick={handleSendClick}>확인</button>
    </div>
  );
}
