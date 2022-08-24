import { UserWhithSelf } from './user-whith-self.type';

export type RoomUsersCards = {
  id: string;
  name: string;
  status: boolean;
  ballTime: number;
  userCards: number;
  users: UserWhithSelf[];
};
