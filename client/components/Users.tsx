import Invite from "@/assets/svg/invite.svg";
import { useRoom } from "@/store/room";
import { User } from "@/types/room";

interface Props {
  users: User[];
  myNickname: string;
}

export default function Users({ users, myNickname }: Props) {
  const { roomId } = useRoom();

  const handleInviteClick = () => {
    navigator.clipboard.writeText(`${window.location.href}?c=${roomId}`);
  };

  return (
    <div className="p-3">
      <h2 className="text-lg">현재 인원 ({users.length}/4)</h2>
      <ul className="flex gap-2 my-4">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-white rounded-full"></div>
            <li>
              <h3
                className={
                  user.nickname === myNickname ? "text-pink" : undefined
                }
              >
                {user.nickname}
              </h3>
            </li>
          </div>
        ))}
      </ul>
      <button
        className="bg-pink w-full p-2 rounded-sm relative active:top-[1px] hover:brightness-95"
        onClick={handleInviteClick}
      >
        <span className="flex justify-center items-center gap-1">
          초대
          <Invite width="12" height="12" fill="white" />
        </span>
      </button>
    </div>
  );
}
