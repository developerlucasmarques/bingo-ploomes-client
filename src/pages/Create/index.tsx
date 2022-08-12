import "./index.css";
import bola from "../../assets/img/bola.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swall from "sweetalert";

const Create = () => {
  const [values, setvalues] = useState({
    nickname: "",
    room: "",
    timmer: 0,
    cards: 0,
  });

  let navigate = useNavigate();
  const handleChangeValues = (event: any) => {
    setvalues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const joinSession = async (event: any) => {
    event.preventDefault();
    if (values.timmer > 10) {
      swall({
        icon: "error",
        title: "voce adicionou muito tempo, o máximo é 10",
        timer: 3000,
      });
      return;
    }
    if (values.cards > 3) {
      swall({
        icon: "error",
        title: "voce adicionou muitas cartelas, o máximo é 3",
        timer: 3000,
      });

      return;
    }

    if (values.timmer <= 0) {
      swall({
        icon: "error",
        title: "adicione um tempo maior que 0",
        timer: 3000,
      });
      return;
    }
    if (values.cards <= 0) {
      swall({
        icon: "error",
        title: "adicione um numero de cartelas maior que 0",
        timer: 3000,
      });
      return;
    }

    if (values.nickname == "") {
      swall({
        icon: "error",
        title: "adicione um nickname",
        timer: 3000,
      });
      return;
    }
    if (values.room == "") {
      swall({
        icon: "error",
        title: "adicione um nome para a sala",
        timer: 3000,
      });
      return;
    }
    console.log(values);
    navigate("/Bingo");
  };

  return (
    <>
      <body>
        <div className="page1">
          <div className="all">
            <h1>
              <strong> Bingão do G5 </strong>{" "}
            </h1>

            <img src={bola} alt="logo" />
            <form onSubmit={joinSession}>
              <input
                className="input-text"
                onChange={handleChangeValues}
                name="nickname"
                placeholder="nickname"
                type="text"
              />
              <input
                className="input-text"
                onChange={handleChangeValues}
                name="room"
                placeholder="nome da sala"
                type="text"
              />
              <span className="input-slide">
                <h2 className="h2">Tempo</h2>
                <input
                  onChange={handleChangeValues}
                  name="timmer"
                  className="slide"
                  type="number"
                />
                <h2 className="h2">Cartelas</h2>
                <input
                  onChange={handleChangeValues}
                  name="cards"
                  className="slide"
                  type="number"
                />
              </span>

              <button className="button-1" type="submit">
                <h2>Criar</h2>
              </button>
              <span className="buttons">
                <button type="button" className="help">
                  ?
                </button>
              </span>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};

export default Create;
