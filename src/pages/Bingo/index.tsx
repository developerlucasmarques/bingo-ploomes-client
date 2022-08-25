import { State } from 'history';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import bola from '../../assets/img/bola.png';
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
    handleSetCards();
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
  const [time, setTime] = useState<number>();
  const intervalRef = useRef<number | undefined>();
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

    socket.emit('create-room-and-user', {
      roomId: room.id,
      userId: user?.id,
    });
  };

  useEffect(() => {
    socket.connect();

    StartListners();

    newBall();
    checkIfUserBingo();
  }, [socket]);

  const StartListners = () => {
    socket.io.on('reconnect', (attempt) => {
      console.log('Reconnected on attempt: ' + attempt);
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.log('Reconnection attempt: ' + attempt);
    });
  };

  const handleSetCards = async () => {};

  const handleBackground = (event: React.SyntheticEvent) => {
    if (event.currentTarget.className == 'number background-color-number') {
      event.currentTarget.classList.remove('background-color-number');
    } else {
      event.currentTarget.classList.add('background-color-number');
    }
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const startGame = (event: React.SyntheticEvent) => {
    event.currentTarget.classList.add('bingo-button-display-none');
    buttonRef.current?.classList.remove('bingo-button-display-none');
    setTime(StartTime);

    socket.emit('start-game', { roomId: RoomId, userId: UserId });
  };

  const newBall = () => {
    socket.on('new-ball', (ball) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTime(startTime);
      }

      if (ball.end === true) {
        clearInterval(intervalRef.current);
        console.log('fim');
        return;
      }

      intervalRef.current = setInterval(() => {
        setTime((time) => Number(time) - 1);
      }, 1000);

      setNewBall(ball.ball);
    });
  };

  const bingo = () => {
    clearInterval(intervalRef.current);
    socket.emit('check-bingo', { roomId: RoomId, userId: UserId });
  };

  const checkIfUserBingo = () => {
    socket.on('verify-bingo', (element: VerifyBingo) => {
      if (element.bingo) {
        console.log(`${element.nickname} você bingou e ganhou um ponto`);
        setScore(element.score);
      }
      if (!element.bingo) {
        console.log(`${element.nickname} você não bingou e perdeu um ponto`);
      }
    });
  };

  return (
    <>
      <body className="bingo-body">
        <div className="bingo-chat">
          <div className="bingo-participantes">
            <h1 className="bingo-h1-participants">Participants</h1>
            <div className="bingo-participant-container">
              <div className="bingo-participant-boxname">
                <img
                  className="bingo-participant-img"
                  src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                  alt=""
                />
                {Nickame}
              </div>
              <h4 className="bingo-participant-h4">Score: {Score}</h4>
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
                  Send
                </button>
              </form>
            </span>
          </div>
        </div>
        <div className="bingo-all">
          <div className="bingo-balls">
            <div className="bingo-container1">
              <h1 className="bingo-oponente-cards">Oponente card</h1>
              <h1 className="bingo-opoenente-name">oponente name</h1>
              <div className="bingo-oponente-card">
                <div className="bingo-current-card">Cartela adversaria</div>
              </div>
            </div>
            <div className="bingo-container2">
              <h1 className="bingo-h1-currentball">current Ball</h1>
              <div className="bingo-current-ball">
                <div className="time">{time}</div>
                <div className="bingo-currentball-newBall">
                  <div className="new-ball-middle-circus">{NewBall}</div>
                </div>
              </div>
              <button
                onClick={bingo}
                ref={buttonRef}
                className="bingo-button bingo-button-display-none"
                type="button"
              >
                Bingo
              </button>
              <button
                onClick={startGame}
                className="start-button"
                type="button"
              >
                Começar
              </button>
              <h2 className="bingo-h2-yourcards">your-cards</h2>
            </div>
            <div className="bingo-container3">
              <h1 className="bingo-h1-board">Board</h1>
              <div className="bingo-before-balls">
                <div className="bingo-container-beforeballs">
                  <span className="bingo-beforeball">
                    <img className="bingo-ballimg" src={bola} alt="" />{' '}
                  </span>
                  <span className="bingo-beforeball">
                    <img className="bingo-ballimg" src={bola} alt="" />
                  </span>
                  <span className="bingo-beforeball">
                    <img className="bingo-ballimg" src={bola} alt="" />
                  </span>
                </div>
                <div className="bingo-container-beforeballs">
                  <span className="bingo-beforeball">
                    <img className="bingo-ballimg" src={bola} alt="" />
                  </span>
                  <span className="bingo-beforeball">
                    <img className="bingo-ballimg" src={bola} alt="" />
                  </span>
                  <span className="bingo-beforeball">
                    <img className="bingo-ballimg" src={bola} alt="" />
                  </span>
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
                      Activate Super
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
