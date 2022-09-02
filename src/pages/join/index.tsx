import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swall from 'sweetalert';
import bola from '../../assets/img/bola.png';
import { getRoomJoin } from '../../services/bingoService';
import './index.css';

import { authRoomService } from '../../services/bingoService';

const join = () => {
  let { roomId } = useParams();

  const [values, setValues] = useState({
    nickname: '',
    roomId: roomId,
  });
  let roomName = '';

  let navigate = useNavigate();

  const handleChangesValues = (event: any) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const joinsession = async (event: any) => {
    event.preventDefault();
    if (values.nickname == '') {
      swall({
        icon: 'error',
        title: 'Você nao pode entar na sala sem um nick ',
        timer: 3000,
      });
      return;
    } else {
      const response = await getRoomJoin.singleRoomJoin(values);
      const userid = response.data.user.id;
      roomName = response.data.room.name;

      const objtoken = {
        userId: userid,
      };
      const responsetoken = await authRoomService.auth(objtoken);

      const tokenuser = responsetoken.data.token;

      localStorage.setItem('jwtToken', tokenuser);

      swall({
        icon: 'success',
        title: `Você entrou na sala ${roomName}`,
        timer: 4000,
      });
      navigate(`/Bingo/${roomId}`);
    }
  };

  return (
    <>
      <body>
        <div className="all">
          <h1>
            <strong id="logo1"> Breaking bIngo </strong>
          </h1>
          <span className="bola">
            <img src={bola} alt="bola" />
          </span>
          <form onSubmit={joinsession}>
            <input
              maxLength={20}
              type="text"
              name="nickname"
              placeholder="nickname"
              onChange={handleChangesValues}
            />
            <button className="button" type="submit">
              Entrar
            </button>
          </form>
        </div>
      </body>
    </>
  );
};

export default join;
