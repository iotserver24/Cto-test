export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'me' | 'them';
}
