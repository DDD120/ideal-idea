import MessageInput from "@/components/MessageInput";
import useChat from "@/hooks/useChat";
import { useEffect, useRef } from "react";
import { useSocket } from "@/store/socket";
import { useRoomId } from "@/store/room";

interface Props {
  myNickname: string;
}

export default function Chat({ myNickname }: Props) {
  const { messages, setMessages } = useChat();
  const socket = useSocket();
  const roomId = useRoomId();
  const scrollRef = useRef<HTMLLIElement>(null);

  const handleSetMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", nickname: myNickname, content },
    ]);
    socket.emit("message", {
      roomId,
      nickname: myNickname,
      content,
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex-1">
      <ul className="h-[320px] overflow-y-scroll p-3">
        {messages.map((message, index) => (
          <li key={index}>
            {message.type === "user" ? (
              <div className="flex gap-2 my-2">
                <div className="w-9 h-9 bg-white rounded-full shrink-0"></div>
                <div>
                  <h3
                    className={
                      message.nickname === myNickname ? "text-pink" : undefined
                    }
                  >
                    {message.nickname}
                  </h3>
                  <p className="break-all">{message.content}</p>
                </div>
              </div>
            ) : (
              <p>{message.content}</p>
            )}
          </li>
        ))}
        <li ref={scrollRef} />
      </ul>
      <MessageInput onSetMessage={handleSetMessage} />
    </div>
  );
}
