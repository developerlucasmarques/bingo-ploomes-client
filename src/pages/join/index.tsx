import React from "react";
import "./index.css";
import bola from "../../assets/img/bola.png";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swall from "sweetalert";
import { getRoomJoin } from "../../services/bingoService";
import { authRoomService } from "../../services/bingoService";

const join = () => {
  let { roomId } = useParams();
  console.log(roomId);

  const [values, setValues] = useState({
    nickname: "",
    roomId: roomId,
  });

  let navigate = useNavigate();

  const handleChangesValues = (event: any) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const joinsession = async (event: any) => {
    event.preventDefault();
    if (values.nickname == "") {
      swall({
        icon: "error",
        title: "Você nao pode entar na sala sem um nick ",
        timer: 3000,
      });
      return;
    } else {
      const response = await getRoomJoin.singleRoomJoin(values);
      const userid = response.data.user.id;

      console.log("olaaaa", response.data.user);

      // localStorage.setItem("userId", userid);

      const objtoken = {
        userId: userid,
      };
      const responsetoken = await authRoomService.auth(objtoken);

      const tokenuser = responsetoken.data.token;

      localStorage.setItem("jwtToken", tokenuser);

      console.log(response);

      swall({
        icon: "success",
        title: "você entrou na sala",
        timer: 1000,
      });
      navigate(`/Bingo/${values.nickname}`);
    }
  };

  return (
    <body>
      <div className="all">
        <h1>Bingão do G5</h1>
        <span className="bola">
          <img src={bola} alt="bola" />
        </span>
        <form onSubmit={joinsession}>
          <input
            type="text"
            name="nickname"
            placeholder="nickname"
            onChange={handleChangesValues}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </body>
  );
};

export default join;
