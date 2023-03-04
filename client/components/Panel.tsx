import MessageInput from "@/components/MessageInput";
import useChat from "@/hooks/useChat";
import useUsers from "@/hooks/useUsers";
import { useRoomId } from "@/store/room";
import { useSocket } from "@/store/socket";

export default function Panel() {
  const { users, me } = useUsers();
  const { messages, setMessages } = useChat();
  const socket = useSocket();
  const roomId = useRoomId();

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

  const handleInviteClick = () => {
    navigator.clipboard.writeText(`${window.location.href}?c=${roomId}`);
  };

  return (
    <section className="bg-white">
      <h1>ROOM</h1>
      <h2>내 닉네임 : {me.nickname}</h2>
      <h2>현재 인원 {users.length}</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nickname}</li>
        ))}
      </ul>
      <button onClick={handleInviteClick}>초대</button>
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
    </section>
  );
}
