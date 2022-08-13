import api from "./api";

interface dados {
  nickname: string;
  name: string;
  ballTime: number;
  userCards: number;
}

const createRoomService = {
  createRoom: async (values: dados) =>
    api
      .post("/room", values)
      .then((response: any) => response)
      .catch((error: any) => console.log(error.message)),
};

export { createRoomService };
