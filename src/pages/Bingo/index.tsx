import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swall from 'sweetalert';
import { getRoom } from '../../services/bingoService';
import { useSocket } from './hooks/useSocket';
import './index.css';
import { GeneratedCard } from './types/generated-card.type';
import { RoomUsersCards } from './types/room-users-and-user-self-cards.type';
import { UserWhithSelf } from './types/user-whith-self.type';
import { VerifyBingo } from './types/verify-bingo-response.type';

const Bingo: React.FC = () => {
  useEffect(() => {
    getAllDetails();
  }, []);

  const socket = useSocket('http://localhost:8001', {
    reconnectionAttempts: 10,
    reconnectionDelay: 5000,
    autoConnect: false,
  });

  const [Nickame, setNickname] = useState<string | undefined>();
  const [Score, setScore] = useState<number | undefined>();
  const [Cards, SetCards] = useState<GeneratedCard[]>([]);
  const [NewBall, setNewBall] = useState<number>();
  const [UserId, setUserId] = useState<string>();
  const [RoomId, setRoomId] = useState<string>();
  const [StartTime, setStartTime] = useState<number>();
  const [ballExist, setBallExist] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  const intervalRef = useRef<any>();
  const [lastSixBalls, setLastSixBalls] = useState<number[]>();
  const [startGameUserHost, setStartGameUserHost] = useState<boolean>();
  const [showButtonStartGame, setShowButtonStartGame] = useState<boolean>(true);
  const [showButtonBingo, setShowButtonBingo] = useState<boolean>(false);

  let startTime = 0;

  const getAllDetails = async () => {
    const response = await getRoom.singleRoom();
    const room: RoomUsersCards = response.data;

    const cardsOfUser: GeneratedCard[] = [];
    for (let user of room.users) {
      if (user.isSelf) {
        for (let card of user.cards) {
          cardsOfUser.push(card.numbers);
        }
      }
    }
    SetCards(cardsOfUser);

    const user: UserWhithSelf | undefined = room.users.find(
      (user) => user.isSelf
    );

    setNickname(user?.nickname);
    setScore(user?.score);
    setUserId(user?.id);
    setRoomId(room.id);
    startTime = room.ballTime;
    setStartTime(room.ballTime);
    setStartGameUserHost(user?.host);

    socket.emit('create-room-and-user', {
      roomId: room.id,
      userId: user?.id,
    });
  };

  useEffect(() => {
    socket.connect();

    StartListners();
    newUser();

    newBall();
    checkIfUserBingo();
    userReconnect();
  }, [socket]);

  const StartListners = () => {
    socket.io.on('reconnect', (attempt) => {
      console.log('Reconnected on attempt: ' + attempt);
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.log('Reconnection attempt: ' + attempt);
    });
  };

  const handleBackground = (event: React.SyntheticEvent) => {
    if (event.currentTarget.className == 'number background-color-number') {
      event.currentTarget.classList.remove('background-color-number');
    } else {
      event.currentTarget.classList.add('background-color-number');
    }
  };

  const userReconnect = () => {
    socket.on('user-reconnect', (room) => {
      setLastSixBalls(room.lastSixBalls);
      setNewBall(room.currentBall);
      console.log('reconnect', room);
    });
  };

  const newUser = () => {
    socket.on('new-user', (user: string) => {
      console.log('user', user);
    });
    console.log('sada');
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const setStartGameButtonToHostUser = () => {
    if (startGameUserHost && showButtonStartGame) {
      return (
        <button onClick={startGame} className="start-button" type="button">
          Começar
        </button>
      );
    }
  };

  const startGame = (event: React.SyntheticEvent) => {
    event.currentTarget.classList.add('bingo-button-display-none');

    setTime(StartTime);

    socket.emit('start-game', { roomId: RoomId, userId: UserId });

    setShowButtonStartGame(false);
  };

  const showAndRemoveButtonBingo = () => {
    socket.on('button-bingo', (boolean: boolean) => {
      if (boolean === true) {
        setShowButtonBingo(true);
        console.log('button', boolean);
      } else {
        setShowButtonBingo(false);
      }
    });

    if (showButtonBingo) {
      return (
        <button
          onClick={bingo}
          ref={buttonRef}
          className="bingo-button"
          type="button"
        >
          Bingo
        </button>
      );
    }
  };

  const currentBall = useRef<HTMLDivElement>(null);

  const ballExistF = () => {
    if (ballExist) {
      return (
        <div
          ref={currentBall}
          className="bingo-currentball-newBall animation-spin-ball"
        >
          <div className="new-ball-middle-circus">{NewBall}</div>
        </div>
      );
    }
  };

  const newBall = () => {
    socket.on('new-ball', (balls) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTime(startTime);
      }

      console.log(balls);

      if (balls.end === true) {
        clearInterval(intervalRef.current);
        return;
      }

      intervalRef.current = setInterval(() => {
        setTime((time) => Number(time) - 1);
      }, 1000);

      setNewBall(balls.ball);
      setLastSixBalls(balls.lastSixBalls);
      setBallExist(true);

      currentBall.current?.classList.add('animation-spin-ball');

      setTimeout(() => {
        currentBall.current?.classList.remove('animation-spin-ball');
      }, 600);
    });
  };

  const bingo = () => {
    socket.emit('check-bingo', { roomId: RoomId, userId: UserId });
  };

  const checkIfUserBingo = () => {
    socket.on('verify-bingo', (element: VerifyBingo) => {
      if (element.bingo) {
        clearInterval(intervalRef.current);
        setScore(element.score);
        modalAddPoints();
      }
      if (!element.bingo) {
        modalRemovePoints();
      }
    });

    socket.on('user-made-point', (nickname) => {
      modalUserMadePoint(nickname.nickname);
      clearInterval(intervalRef.current);
    });
  };

  const modalAddPoints = () => {
    swall({
      icon: 'success',
      title: 'Você bingou e ganhou 1 ponto',
      timer: 7000,
    });
  };

  const modalUserMadePoint = (nickname: string) => {
    swall({
      icon: 'success',
      title: `${nickname} fez um ponto`,
      timer: 7000,
    });
  };

  const modalRemovePoints = () => {
    swall({
      icon: 'error',
      title: 'Você não bingou e não poderá bingar pelas próximas 3 rodadas',
      timer: 7000,
    });
  };

  const nomeWinner = 'test';
  const Navigate = useNavigate();

  const modalWin = () => {
    swall({
      icon: 'info',
      title: `${nomeWinner} ganhou o jogo`,
      text: `${nomeWinner} fez 5 pontos e venceu o jogo, crie uma nova sala ou entre em uma nova para continuar jogando`,
      timer: 5000,
    });
    setTimeout(() => {
      Navigate('/');
    }, 5000);
  };

  return (
    <>
      <body className="bingo-body">
        <div className="bingo-chat">
          <div className="bingo-participantes">
            <div className="participantes-title">
              <h1 className="bingo-h1-participants">Participantes</h1>
            </div>
            <div className="bingo-participant-container">
              <div className="bingo-participant-boxname">
                <img
                  className="bingo-participant-img"
                  src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                  alt=""
                />
                {Nickame}
              </div>
              <h4 className="bingo-participant-h4">Pontos: {Score}</h4>
            </div>
          </div>
          <div className="bingo-messages">
            <div className="bingo-chat-background">
              <div>
                <div className="bingo-chat-message">
                  <div className="chat-img-nickname">
                    <img
                      className="bingo-img-message"
                      src="https://cdn-icons-png.flaticon.com/512/1/1247.png"
                      alt=""
                    />

                    <h4 className="bingo-chat-nickname">Jacare</h4>
                  </div>
                  <h2 className="chat-message-content">
                    falta 1 para o bingo bingo bingo bingo bingo bingo bingo
                    bingo bingo bingo bingo ola mundo bingo ola mundo bingo ola
                    mundo bingo ola mundo
                  </h2>
                </div>
              </div>
            </div>
            <span className="bingo-textsend">
              <form className="bingo-chat-form" action="">
                <input
                  className="bingo-chat-input"
                  placeholder="Send message"
                  type="text"
                />
                <button className="bingo-chat-button" type="submit">
                  Enviar
                </button>
              </form>
            </span>
          </div>
        </div>
        <div className="bingo-all">
          <div className="bingo-balls">
            <div className="bingo-container1">
              <div className="bingo-award">
                <h1 className="bingo-oponente-cards">Prêmio da rodada</h1>
              </div>

              <div className="bingo-oponente-card"></div>
            </div>
            <div className="bingo-container2">
              <h1 className="bingo-h1-currentball">Bola Atual</h1>
              <div className="bingo-current-ball">
                <div className="time">
                  <p>TEMPO</p>
                  {time}
                </div>
                {ballExistF()}
              </div>
              {/* <button
                onClick={bingo}
                ref={buttonRef}
                className="bingo-button bingo-button-display-none"
                type="button"
              >
                Bingo
              </button> */}
              {showAndRemoveButtonBingo()}
              {setStartGameButtonToHostUser()}
              <h2 className="bingo-h2-yourcards">Suas Cartelas</h2>
            </div>
            <div className="bingo-container3">
              <div className="last-balls">
                <h1 className="bingo-h1-board">Quadro de Bolas</h1>
              </div>

              <div className="bingo-before-balls">
                <div className="bingo-container-beforeballs">
                  {lastSixBalls?.map<React.ReactNode>((ball: number) => (
                    <div className="around-ball">
                      <div className="new-ball-middle-circus">{ball}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bingo-supers">
                <form className="bingo-form-dropdown">
                  <div className="bingo-select">
                    <select
                      className="bingo-dropdown"
                      name="supers"
                      id="supers"
                    >
                      <option className="bingo-option" value="blur">
                        aplicar blur na tela do oponente
                      </option>
                      <option className="bingo-option" value="blur">
                        aoi
                      </option>
                      <option className="bingo-option" value="blur">
                        asdasdas
                      </option>
                    </select>
                  </div>
                  <div className="bingo-button-select">
                    <button className="bingo-super-button" type="submit">
                      Ativar Super
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bingo-cards">
            {Cards.map((element: GeneratedCard, index: number) => (
              <span className="bingo-card" key={index}>
                <div className="bingo-table-all">
                  <div className="bingo-letters">
                    <div className="bingo-letter">B</div>
                    <div className="bingo-letter">I</div>
                    <div className="bingo-letter">N</div>
                    <div className="bingo-letter">G</div>
                    <div className="bingo-letter">O</div>
                  </div>

                  <div className="bingo-numbers">
                    <div className="bingo-colum">
                      {element.B.map<React.ReactNode>(
                        (item: number, index: number) => (
                          <div
                            onClick={handleBackground}
                            key={index}
                            className="number "
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                    <div className="bingo-colum">
                      {element.I.map<React.ReactNode>(
                        (item: number, index: number) => (
                          <div
                            onClick={handleBackground}
                            key={index}
                            className="number"
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                    <div className="bingo-colum">
                      {element.N.map<React.ReactNode>(
                        (item: number, index: number) => (
                          <div
                            onClick={handleBackground}
                            key={index}
                            className="number"
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                    <div className="bingo-colum">
                      {element.G.map<React.ReactNode>(
                        (item: number, index: number) => (
                          <div
                            onClick={handleBackground}
                            key={index}
                            className="number"
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                    <div className="bingo-colum">
                      {element.O.map<React.ReactNode>(
                        (item: number, index: number) => (
                          <div
                            onClick={handleBackground}
                            key={index}
                            className="number"
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </span>
            ))}
          </div>
        </div>
      </body>
    </>
  );
};

export default Bingo;
