import { useEffect, useState } from "react";
import { useSocket } from "@/store/socket";
import { Message } from "@/types/room";

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();

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
