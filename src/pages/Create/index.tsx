import "./index.css";
import bola from "../../assets/img/bola.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swall from "sweetalert";
import { createRoomService } from "../../services/bingoservice";

interface create {
  nickname: string;
  name: string;
  ballTime: number;
  userCards: number;
}
const Create = () => {
  const [values, setvalues] = useState<create>({
    nickname: "",
    name: "",
    ballTime: 0,
    userCards: 0,
  });

  let navigate = useNavigate();

  // const handleChangeValues = (event: any) => {
  //   setvalues((values) => ({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   }));
  // };

  const handlechangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    console.log(event.target.value);

    setvalues({
      ...values,
      nickname: event.target.value,
      name: event.target.value,
      ballTime: +event.target.value,
      userCards: +event.target.value,
    });
  };

  const joinSession = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (values.ballTime > 10) {
      swall({
        icon: "error",
        title: "voce adicionou muito tempo, o máximo é 10",
        timer: 3000,
      });
      return;
    }
    if (values.userCards > 3) {
      swall({
        icon: "error",
        title: "voce adicionou muitas cartelas, o máximo é 3",
        timer: 3000,
      });

      return;
    }

    if (values.ballTime <= 5) {
      swall({
        icon: "error",
        title: "adicione um tempo maior que 5",
        timer: 3000,
      });
      return;
    }
    if (values.userCards <= 0) {
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
    if (values.name == "") {
      swall({
        icon: "error",
        title: "adicione um nome para a sala",
        timer: 3000,
      });
      return;
    }

    const response = await createRoomService.createRoom(values);
    //navigate(`/Bingo/${values.room}`);
  };

  return (
    <>
      <body>
        <div className="page1">
          <div className="all">
            <h1>
              <strong> Bingão do G5 </strong>
            </h1>

            <img src={bola} alt="logo" />
            <form onSubmit={joinSession}>
              <input
                className="input-text"
                onChange={handlechangeValues}
                name="nickname"
                placeholder="nickname"
                type="text"
              />
              <input
                className="input-text"
                onChange={handlechangeValues}
                name="name"
                placeholder="nome da sala"
                type="text"
              />
              <span className="input-slide">
                <h2 className="h2">Tempo</h2>
                <input
                  onChange={handlechangeValues}
                  name="ballTime"
                  className="slide"
                  type="number"
                />
                <h2 className="h2">Cartelas</h2>
                <input
                  onChange={handlechangeValues}
                  name="userCards"
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
