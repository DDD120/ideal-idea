import Image from "next/image";
import useUsers from "@/hooks/useUsers";
import Chat from "./Chat";
import Users from "./Users";

export default function Panel() {
  const { users, me } = useUsers();

  return (
    <section className="bg-navy-800 w-72 h-[600px] rounded-sm flex flex-col justify-between">
      <h1 className="text-white px-3 pt-3 flex items-center gap-2">
        <div className="w-4">
          <Image src="/logo.png" alt="로고" width={72} height={72} />
        </div>
        ideal idea
      </h1>
      <Users users={users} myNickname={me.nickname} />
      <Chat myNickname={me.nickname} />
    </section>
  );
}
