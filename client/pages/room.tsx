import useRoom from "@/hooks/useRoom";

export default function Room() {
  const { users, me } = useRoom();

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
    </div>
  );
}
