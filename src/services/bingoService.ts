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

const authRoomService = {
  auth: async (userid: any) =>
    api
      .post("/auth", userid)
      .then((response: any) => response)
      .catch((error: any) => console.log(error.message)),
};

const getRoom = {
  singleRoom: async () =>
    api
      .get("/room/single")
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => console.log(error)),
};

export { createRoomService, authRoomService, getRoom };
