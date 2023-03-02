export interface User {
  id: string;
  nickname: string;
}

export interface Message {
  type: string;
  nickname: string;
  content: string;
}
