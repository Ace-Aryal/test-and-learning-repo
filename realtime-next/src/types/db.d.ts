interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}
interface chat {
  id: string;
  messages: Message[];
}
interface friendRequest {
  id: string;
  senderId: string;
  receiverId: string;
}
