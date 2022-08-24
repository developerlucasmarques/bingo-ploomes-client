import { UserSocket } from './user-socket';

export type RoomSocket = {
  id: string;
  ballTime: number;
  users: UserSocket[];
};
