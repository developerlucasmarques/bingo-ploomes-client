import './index.css';
import bola from '../../assets/img/bola.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swall from 'sweetalert';
import {
  authRoomService,
  createRoomService,
} from '../../services/bingoService';

interface create {
  nickname: string;
  name: string;
  ballTime: number;
  userCards: number;
}
const Create = () => {
  const [values, setvalues] = useState<create>({
    nickname: '',
    name: '',
    ballTime: 5,
    userCards: 1,
  });

  let navigate = useNavigate();

  const handlechangeValues = (event: any) => {
    setvalues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  const handlechangeValuesNumber = (event: any) => {
    setvalues((values) => ({
      ...values,
      [event.target.name]: +event.target.value,
    }));
  };

  const joinSession = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (values.ballTime > 10) {
      swall({
        icon: 'error',
        title: 'Você adicionou muito tempo, o máximo é 10',
        timer: 3000,
      });
      return;
    }
    if (values.userCards > 3) {
      swall({
        icon: 'error',
        title: 'Você adicionou muitas cartelas, o máximo é 3',
        timer: 3000,
      });

      return;
    }

    if (values.ballTime < 5) {
      swall({
        icon: 'error',
        title: 'Adicione um tempo maior que 5',
        timer: 3000,
      });
      return;
    }
    if (values.userCards <= 0) {
      swall({
        icon: 'error',
        title: 'Adicione um numero de cartelas maior que 0',
        timer: 3000,
      });
      return;
    }
    if (values.nickname == '') {
      swall({
        icon: 'error',
        title: 'Adicione um nickname',
        timer: 3000,
      });
      return;
    }
    if (values.name == '') {
      swall({
        icon: 'error',
        title: 'Adicione um nome para a sala',
        timer: 3000,
      });
      return;
    }
    const response = await createRoomService.createRoom(values);
    const userid = response.data.user.id;
    const roomid = response.data.room.id;
    console.log(response.data.room.id);

    //localStorage.setItem("userId", userid);

    const objtoken = {
      userId: userid,
    };
    const responsetoken = await authRoomService.auth(objtoken);

    const tokenuser = responsetoken.data.token;

    localStorage.setItem('jwtToken', tokenuser);

    navigate(`/Bingo/${roomid}`);
  };

  const modalHelpCreate = () => {
    swall({
      icon: 'info',
      title: 'COMO CRIAR UMA SALA',
      text: `NICKNAME: Insira seu nickname para ser usado na sala

             NOME DA SALA: Insira um nome para sua sala

             TEMPO: Insira o delay para o sorteio de cada bola (Min:5s | Max: 10s)

             CARTELAS: Insira a quantidades de cartelas que cada usuario terá (Max: 3)
      `,
    });
  };

  return (
    <>
      <body>
        <div className="page1">
          <div className="all">
            <h1>
              <strong id="logo1"> Breaking Bingo </strong>
            </h1>

            <img src={bola} alt="logo" />
            <form onSubmit={joinSession}>
              <input
                className="input-text"
                onChange={handlechangeValues}
                name="nickname"
                placeholder="nickname"
                type="text"
                maxLength={20}
              />
              <input
                className="input-text"
                onChange={handlechangeValues}
                name="name"
                placeholder="nome da sala"
                type="text"
                maxLength={20}
              />
              <span className="input-slide">
                <h2 className="h2">Tempo: {values.ballTime}</h2>
                <input
                  onChange={handlechangeValuesNumber}
                  name="ballTime"
                  className="slide"
                  type="range"
                  id="timeRange"
                  defaultValue={5}
                  min={5}
                  max={10}
                />
                <h2 className="h2 card2">Cartelas: {values.userCards}</h2>
                <input
                  onChange={handlechangeValuesNumber}
                  name="userCards"
                  className="slide"
                  type="range"
                  id="cardRange"
                  defaultValue={1}
                  min={1}
                  max={3}
                  
                />
              </span>

              <button className="button-1" type="submit">
                <h2>Criar</h2>
              </button>
              <span className="buttons">
                <button
                  onClick={modalHelpCreate}
                  type="button"
                  className="help"
                >
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
