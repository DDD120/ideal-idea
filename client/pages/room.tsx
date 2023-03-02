import MessageInput from "@/components/MessageInput";
import useChat from "@/hooks/useChat";
import useRoom from "@/hooks/useRoom";
import { useSocket } from "@/store/socket";
import { GetServerSidePropsContext } from "next";

interface Props {
  roomId: string;
}

export default function Room({ roomId }: Props) {
  const socket = useSocket();
  const { users, me } = useRoom(roomId);
  const { messages, setMessages } = useChat();

  const handleSetMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", nickname: me.nickname, content },
    ]);
    socket.emit("message", {
      roomId,
      nickname: me.nickname,
      content,
    });
  };

  return (
    <div>
      <h1>ROOM</h1>
      <h2>내 닉네임 : {me.nickname}</h2>
      <h2>현재 인원 {users.length}</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nickname}</li>
        ))}
      </ul>
      <h2>채팅창</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.type === "user" && `${message.nickname} : `}
            {message.content}
          </li>
        ))}
      </ul>
      <MessageInput onSetMessage={handleSetMessage} />
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const roomId = query.c;
  return {
    props: { roomId },
  };
}
