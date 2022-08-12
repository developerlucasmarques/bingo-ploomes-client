import React from "react";
import "./index.css";
import bola from "../../assets/img/bola.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swall from "sweetalert";

const join = () => {
  const [values, setValues] = useState({
    nickname: "",
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
      // console.log(values);
      // const response = await JoinService.Jogin(values);
      swall({
        icon: "success",
        title: "você entrou na sala",
        timer: 1000,
      });
      navigate(`/Bingo/${values.nickname}`);
    }
  };

  return (
    <>
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
    </>
  );
};

export default join;
