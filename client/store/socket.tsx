import { io, Socket } from "socket.io-client";
import { createContext, useContext } from "react";

const socket = io("http://localhost:4000");

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket should be used within SocketProvider");
  }

  return socket;
}
