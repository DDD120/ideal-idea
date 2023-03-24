import Invite from "@/public/svg/invite.svg";
import { useRoom } from "@/store/room";
import { User } from "@/types/room";
import Image from "next/image";
import Button from "./Button";

interface Props {
  users: User[];
  myNickname: string;
}

export const profileImage = {
  토끼: "/profile/rabbit.jpg",
  고양이: "/profile/cat.jpg",
  강아지: "/profile/dog.jpg",
  여우: "/profile/fox.jpg",
};

export default function Users({ users, myNickname }: Props) {
  const { roomId } = useRoom();

  const handleInviteClick = () => {
    navigator.clipboard.writeText(`${window.location.href}?c=${roomId}`);
  };

  return (
    <div className="px-3">
      <h2 className="text-lg">현재 인원 ({users.length}/4)</h2>
      <ul className="flex items-center gap-2 my-4 h-[68px]">
        {users.map((user) => (
          <li key={user.id} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
              <Image
                src={profileImage[user.nickname]}
                alt={`${user.nickname} 그림`}
                width={100}
                height={100}
              />
            </div>
            <h3 className={user.nickname === myNickname ? "text-pink" : ""}>
              {user.nickname}
            </h3>
          </li>
        ))}
      </ul>
      <Button bgColor="pink" onClick={handleInviteClick}>
        <span className="flex justify-center items-center gap-1">
          초대
          <Invite width="12" height="12" fill="white" />
        </span>
      </Button>
    </div>
  );
}
