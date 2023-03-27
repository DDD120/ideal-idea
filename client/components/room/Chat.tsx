import MessageInput from "@/components/room/MessageInput";
import useChat from "@/hooks/useChat";
import { Nickname } from "@/utils/types";
import Image from "next/image";
import { profileImage } from "./Users";
import { v1 as timestamp } from "uuid";

interface Props {
  myNickname: Nickname;
}

export default function Chat({ myNickname }: Props) {
  const { messages, onSetMessage, scrollRef } = useChat();

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
                      message.nickname === myNickname ? "text-pink" : ""
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
      <MessageInput nickname={myNickname} onSetMessage={onSetMessage} />
    </div>
  );
}
