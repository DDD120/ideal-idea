import { useEffect, useState } from "react";
import { Message } from "@/utils/types";
import { useRoom } from "@/store/room";

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useRoom();

  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return {
    messages,
    setMessages,
  };
}
