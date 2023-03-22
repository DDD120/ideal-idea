export interface User {
  id: string;
  nickname: Nickname;
}

export interface Message {
  type: "user" | "notice";
  nickname?: Nickname;
  content: string;
}

export type Nickname = "토끼" | "고양이" | "강아지" | "여우";
