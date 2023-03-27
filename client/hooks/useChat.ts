import { useEffect, useRef, useState } from "react";
import { Message, Nickname } from "@/utils/types";
import { useRoomContext } from "@/context/roomContext";

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket, roomId } = useRoomContext();
  const scrollRef = useRef<HTMLLIElement>(null);

  const handleSetMessage = (content: string, nickname: Nickname) => {
    setMessages((prev) => [...prev, { type: "user", nickname, content }]);
    socket.emit("message", {
      roomId,
      nickname,
      content,
    });
  };

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return {
    messages,
    onSetMessage: handleSetMessage,
    scrollRef,
  };
}
