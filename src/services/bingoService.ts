import api from "./api";
import swall from "sweetalert";

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
      .catch((error: any) =>
        swall({
          icon: "error",
          title: `${error.message}`,
        })
      ),
};

const authRoomService = {
  auth: async (userid: any) =>
    api
      .post("/auth", userid)
      .then((response: any) => response)
      .catch((error: any) =>
        swall({
          icon: "error",
          title: `${error.message}`,
        })
      ),
};

const getRoom = {
  singleRoom: async () =>
    api
      .get("/room/single")
      .then((response: any) => {
        return response;
      })
      .catch((error: any) =>
        swall({
          icon: "error",
          title: `${error.message}`,
        })
      ),
};

const getRoomJoin = {
  singleRoomJoin: async (values: any) =>
    api
      .post("/join", values)
      .then((response: any) => response)
      .catch((error: any) =>
        swall({
          icon: "error",
          title: `${error.message}`,
        })
      ),
};

export { createRoomService, authRoomService, getRoom, getRoomJoin };
