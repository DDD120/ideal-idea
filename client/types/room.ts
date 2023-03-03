export interface User {
  id: string;
  nickname: string;
}

export interface Message {
  type: "user" | "notice";
  nickname?: string;
  content: string;
}
