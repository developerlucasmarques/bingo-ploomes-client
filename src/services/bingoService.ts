import api from "./api";
import swall from "sweetalert";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
          title: `${error.response.data.message}`,
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
          title: `${error.response.data.message}`,
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
      .catch((error: any) => {
        if (error.response.data.statusCode == 401) {
          swall({
            icon: "error",
            title: `você nao possui o token adicione um nickname para jogar`,
          });
        }
        swall({
          icon: "error",
          title: `Erro de conexão com a API `,
        });
      }),
};

const getRoomJoin = {
  singleRoomJoin: async (values: any) =>
    api
      .post("/join", values)
      .then((response: any) => response)
      .catch((error: any) => {
        if (error.response.data.statusCode == 400) {
          swall({
            icon: "error",
            title: `O id da sala que você esta tentando entrar nao existe `,
          });
        }
        if (error.response.data.statusCode == 404) {
          swall({
            icon: "error",
            title: `O id da sala que você esta tentando entrar nao existe `,
          });
        }
        if (error.response.data.statusCode == 401) {
          swall({
            icon: "error",
            title: `A sala esta cheia entre em outra sala `,
          });
        }
        swall({
          icon: "error",
          title: `Erro de conexão com a API `,
        });
      }),
};

export { createRoomService, authRoomService, getRoom, getRoomJoin };
