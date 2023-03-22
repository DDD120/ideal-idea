import MessageInput from "@/components/MessageInput";
import useChat from "@/hooks/useChat";
import { useEffect, useRef } from "react";
import { useRoom } from "@/store/room";
import { Nickname } from "@/types/room";
import Image from "next/image";
import { profileImage } from "./Users";
import { v1 as timestamp } from "uuid";

interface Props {
  myNickname: Nickname;
}

export default function Chat({ myNickname }: Props) {
  const { messages, setMessages } = useChat();
  const { roomId, socket } = useRoom();
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
    <div className="flex-1 grow-0">
      <ul className="h-[320px] overflow-y-scroll p-3">
        {messages.map((message) => (
          <li key={timestamp()}>
            {message.type === "user" && message.nickname ? (
              <div className="flex gap-2 my-2">
                <div className="w-9 h-9 bg-white rounded-full shrink-0 overflow-hidden">
                  <Image
                    src={profileImage[message.nickname]}
                    alt={`${message.nickname} 그림`}
                    width={100}
                    height={100}
                  />
                </div>
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
