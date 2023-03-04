import useUsers from "@/hooks/useUsers";
import Chat from "./Chat";
import Users from "./Users";

export default function Panel() {
  const { users, me } = useUsers();

  return (
    <section className="bg-navy-800 w-80 h-[600px] rounded-sm overflow-hidden flex flex-col justify-between">
      <h1 className="text-white p-3">ideal idea</h1>
      <Users users={users} myNickname={me.nickname} />
      <Chat myNickname={me.nickname} />
    </section>
  );
}
