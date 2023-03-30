import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import swall from 'sweetalert';
import ingerrogacao from '../../assets/icons/interrogacao2.png';
import send from '../../assets/icons/send.png';
import share from '../../assets/icons/share.png';
import confete from '../../assets/img/confete.gif';
import cowboy from '../../assets/img/cowboy.png';
import shareModal from '../../assets/img/shareModal.png';
import { getRoom } from '../../services/bingoService';
import { useSocket } from './hooks/useSocket';
import { soundErrou, soundTetra } from './howler/howler';
import './index.css';
import { modalRemovePoints } from './modals/modals';
import { DrawnNumberAndKey } from './types/drawn-number-key.type';
import { GeneratedCard } from './types/generated-card.type';
import { ReceivedBalls } from './types/received-balls.type';
import { RoomUsersCards } from './types/room-users-and-user-self-cards.type';
import { UserMessage } from './types/user-message.type';
import { UserSocket } from './types/user-socket';
import { UserWhithSelf } from './types/user-whith-self.type';
import { VerifyBingo } from './types/verify-bingo-response.type';

Modal.setAppElement('#root');

const Bingo: React.FC = () => {
  useEffect(() => {
    getAllDetails();
  }, []);

  const socket = useSocket(
    'https://bingo-ploomes-server.onrender.com',
    {
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
      autoConnect: false,
    }
  );
  let imgs = [send, share, shareModal, ingerrogacao];
  let eachimg = Math.floor(Math.random() * 4);

  const [Nickame, setNickname] = useState<string | undefined>();
  const [Score, setScore] = useState<number | undefined>();
  const [Cards, SetCards] = useState<GeneratedCard[]>([]);
  const [NewBallAndKey, setNewBall] = useState<DrawnNumberAndKey>();
  const [UserId, setUserId] = useState<string>();
  const [RoomId, setRoomId] = useState<string>();
  const [StartTime, setStartTime] = useState<number>();
  const [ballExist, setBallExist] = useState<boolean>(false);
  const [time, setTime] = useState<number>();
  const [lastSixBalls, setLastSixBalls] = useState<number[]>();
  const [startGameUserHost, setStartGameUserHost] = useState<boolean>();
  const [showButtonStartGame, setShowButtonStartGame] = useState<boolean>();
  const [showButtonBingo, setShowButtonBingo] = useState<boolean>();
  const [usersLogged, setUsersLogged] = useState<UserSocket[]>();
  const [message, setMessage] = useState<string>('');
  const [chatPayload, setChatPayload] = useState<UserMessage[]>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalWinnerIsOpen, setmodalWinnerIsOpen] = useState(false);
  const [modalWinnerAllIsOpen, setmodalWinnerAllIsOpen] = useState(false);
  const [copy, setcopy] = useState(true);
  const [buttoncopy, setbuttoncopy] = useState('modal-button-copy-default');
  const [confeteState, setconfeteState] = useState('bingo-confete-f');
  const [userImage, setUserImage] = useState<string>();
  const [nickNameWinner, setNickNameWinner] = useState<string>();

  const intervalRef = useRef<any>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollRefSelf = useRef<HTMLDivElement>(null);
  const scrollRefMessage = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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
    setUserImage(user?.imageLink);
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
    showAndRemoveButtonStart();
    showAndRemoveButtonBingo();
    chatListener();
    console.log(chatPayload);
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
    socket.on('user-reconnect', (balls: ReceivedBalls) => {
      setBallExist(true);
      setLastSixBalls(balls.lastSixBalls);
      setNewBall(balls.ballAndKey);

      setTimeout(() => {
        currentBall.current?.classList.remove('animation-spin-ball');
      }, 600);
    });
  };

  const newUser = () => {
    socket.on('new-user', (user: UserSocket[]) => {
      setUsersLogged(user);
    });
  };

  const startGame = (event: React.SyntheticEvent) => {
    event.currentTarget.classList.add('bingo-button-display-none');

    setTime(StartTime);

    socket.emit('start-game', { roomId: RoomId, userId: UserId });

    setShowButtonStartGame(false);
  };

  const showAndRemoveButtonStart = () => {
    socket.on('button-start', (showButton: boolean) => {
      if (showButton) {
        setShowButtonStartGame(true);
      } else {
        setShowButtonStartGame(false);
      }
    });
  };

  const showAndRemoveButtonBingo = () => {
    socket.on('button-bingo', (boolean: boolean) => {
      if (boolean) {
        setShowButtonBingo(true);
      } else {
        setShowButtonBingo(false);
      }
    });
  };

  const renderStartGameButtonToHostUser = () => {
    if (startGameUserHost && showButtonStartGame) {
      return (
        <button
          onClick={startGame}
          className="start-button new_font"
          type="button"
        >
          Começar
        </button>
      );
    }
  };

  const renderButtonBingo = () => {
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

  useEffect(() => {
    if (chatPayload) {
      if (chatPayload[chatPayload?.length - 1].id === UserId) {
        scrollRefSelf.current?.scrollIntoView({ behavior: 'smooth' });
        // bodyRef.current?.scrollIntoView();das
      } else {
        scrollRefMessage.current?.scrollIntoView({ behavior: 'smooth' });
        // bodyRef.current?.scrollIntoView();
      }
    }
  }, [chatPayload]);

  const currentBall = useRef<HTMLDivElement>(null);

  const renderCurrentBallAndKey = () => {
    if (ballExist) {
      return (
        <>
          <h2>{NewBallAndKey?.key} </h2>
          <div
            ref={currentBall}
            className="bingo-currentball-newBall animation-spin-ball"
          >
            <div className="new-ball-middle-circus">
              {NewBallAndKey?.drawnNumber}
            </div>
          </div>
        </>
      );
    }
  };

  const newBall = () => {
    socket.on('new-ball', (balls: ReceivedBalls) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTime(startTime);
      }

      socket.on('stop-balls', (stop: boolean) => {
        if (stop) {
          clearInterval(intervalRef.current);
          return;
        }
      });

      intervalRef.current = setInterval(() => {
        setTime((time) => Number(time) - 1);
      }, 1000);

      setNewBall(balls.ballAndKey);
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
        openWinnerModal();
        soundTetra.play();
        setconfeteState('bingo-confete');
        setTimeout(() => {
          Navigate('/');
          setconfeteState('bingo-confete-f');
        }, 12000);
      }
      if (!element.bingo) {
        modalRemovePoints();
        soundErrou.play();
      }
    });

    socket.on('user-made-point', (nickname) => {
      setNickNameWinner(nickname.nickname);
      clearInterval(intervalRef.current);
      openWinnerModalAll();
      setconfeteState('bingo-confete');
      setTimeout(() => {
        Navigate('/');
        setconfeteState('bingo-confete-f');
      }, 12000);
    });
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value.trim();
    if (!message) {
      setMessage('');
      return;
    }
    setMessage(event.target.value);
  };

  const handleSubimit = (event: React.FormEvent<HTMLFormElement>) => {
    const payload = {
      roomId: RoomId,
      userId: UserId,
      message: message,
    };
    socket.emit('chat-msg', payload);

    setMessage('');
    event.preventDefault();
  };

  const chatListener = () => {
    socket.on('new-message', (payload: UserMessage[]) => {
      if (payload.length > 0) {
        setChatPayload(payload);
      }
    });
  };

  let { roomId } = useParams();

  let jwtsecret = localStorage.getItem('jwtToken');
  const Navigate = useNavigate();
  if (!jwtsecret) {
    Navigate(`/join/${roomId}`);
  }

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openWinnerModal = () => {
    setmodalWinnerIsOpen(true);
  };
  const closeWinnerModal = () => {
    setmodalWinnerIsOpen(false);
  };
  const openWinnerModalAll = () => {
    setmodalWinnerAllIsOpen(true);
  };
  const closeWinnerModalAll = () => {
    setmodalWinnerAllIsOpen(false);
  };

  const copybutton = () => {
    navigator.clipboard.writeText(`https://breakingbingo.tk/join/${RoomId}`);
    setcopy(false);
    setbuttoncopy('modal-button-copy');
    setTimeout(() => {
      setcopy(true);
      setbuttoncopy('modal-button-copy-default');
    }, 5000);
  };

  const openModalHelp = () => {
    swall({
      icon: 'info',
      title: 'Como jogar',
      text: ` - Para  fazer um ponto, você deve completar uma linha vertical, horizontal ou diagonal em uma das suas cartelas.

              - Depois de completar uma linha aperte o botão de Bingo 

              - Se você apertar o botão de Bingo sem completar uma linha, receberá uma punição de 5 rodadas sem o botão de BINGO.

              - O primeiro que bingar corretamente ganha a partida
      
      `,
    });
  };

  return (
    <>
      {/* <button onClick={openWinnerModal}>winner single</button>
      <button onClick={openWinnerModalAll}>winner all</button> */}
      {/* modalhelp */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="example modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="container-img-modal">
          <img
            src={shareModal}
            alt="imagem de compartilhamento"
            className="img-share-modal"
          />
        </div>
        <h1 className="text-h1-modal">Convide seus amigos</h1>
        <hr />
        <div className="divcopy">
          <input
            className="input-copy-invite"
            type="text"
            placeholder={`https://breakingbingo.tk/join/${RoomId}`}
            value={`https://breakingbingo.tk/join/${RoomId}`}
          />
          {copy == true ? (
            <button className={buttoncopy} onClick={copybutton}>
              COPIAR
            </button>
          ) : (
            <button className={buttoncopy} onClick={copybutton}>
              COPIADO
            </button>
          )}
        </div>

        <div className="modal-close-button">
          <button className="button-modal-fechar" onClick={closeModal}>
            FECHAR
          </button>
        </div>
      </Modal>

      {/* modalWinnersingle */}

      <Modal
        isOpen={modalWinnerIsOpen}
        onRequestClose={closeWinnerModal}
        contentLabel="example modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="container-img-modal">
          <img
            src={cowboy}
            alt="imagem de compartilhamento"
            className="img-share-modal-cowboy"
          />
        </div>
        <h1 className="text-h1-modal">Parabéns você ganhou o Bingo!!</h1>
        <h2 className="bingo-premio">Seu premio é : UMA VACA VOADORA!!</h2>

        <div className="modal-close-button">
          <button
            className="button-modal-fechar-win"
            onClick={closeWinnerModal}
          >
            FECHAR
          </button>
        </div>
      </Modal>

      {/* modalWinnerAll */}

      <Modal
        isOpen={modalWinnerAllIsOpen}
        onRequestClose={closeWinnerModalAll}
        contentLabel="example modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="container-img-modal">
          <img
            src={cowboy}
            alt="imagem de compartilhamento"
            className="img-share-modal-cowboy"
          />
        </div>
        <h1 className="text-h1-modal">{nickNameWinner} Ganho o Bingo!!</h1>
        <h2 className="bingo-premio">O premio dele é : UMA VACA VOADORA!!</h2>
        <hr />

        <div className="modal-close-button">
          <button
            className="button-modal-fechar-win"
            onClick={closeWinnerModalAll}
          >
            FECHAR
          </button>
        </div>
      </Modal>
      <img className={confeteState} src={confete} alt="confetes caindo" />

      <body className="bingo-body">
        <div ref={bodyRef} className="bingo-chat">
          <div className="bingo-participantes">
            <div className="participantes-title">
              <h1 className="bingo-h1-participants new_text new_font">
                Participantes
              </h1>
            </div>
            <div className="bingo-participants-users">
              <div className="bingo-participant-container-is-self">
                <div className="bingo-participant-boxname">
                  <img
                    className="bingo-participant-img"
                    src={userImage}
                    alt=""
                  />
                  {Nickame}
                </div>
              </div>
              {usersLogged?.map((user) => {
                if (user.id != UserId) {
                  return (
                    <div className="bingo-participant-container">
                      <div className="bingo-participant-boxname">
                        <img
                          className="bingo-participant-img"
                          src={user.imageLink}
                          alt=""
                        />
                        {user.nickname}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="bingo-messages">
            <div className="bingo-messages-border">
              <div className="bingo-chat-background">
                {/* <h3 >CHAT</h3> */}
                <div>
                  {chatPayload?.map<React.ReactNode>((message) => {
                    if (message.id != UserId) {
                      return (
                        <div ref={scrollRefMessage} className="bingo-chat-area">
                          <h4 className="bingo-chat-nickname">
                            {message.nickname}
                          </h4>
                          <div className="bingo-chat-message">
                            <h2 className="chat-message-content">
                              {message.message}
                            </h2>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRefSelf}
                          className="bingo-chat-area-self"
                        >
                          <h4 className="bingo-chat-nickname-self">
                            {message.nickname}
                          </h4>
                          <div className="bingo-chat-message-self">
                            <h2 className="chat-message-content-self">
                              {message.message}
                            </h2>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <span className="bingo-textsend">
                <form
                  className="bingo-chat-form"
                  action=""
                  onSubmit={handleSubimit}
                >
                  <input
                    className="bingo-chat-input"
                    placeholder="Escreva uma mensagem..."
                    value={message}
                    onChange={handleMessage}
                    type="text"
                    minLength={1}
                    maxLength={150}
                    required
                  />
                  <button className="bingo-chat-button" type="submit">
                    <img src={send} alt="" />
                  </button>
                </form>
              </span>
            </div>
          </div>
        </div>
        <div className="bingo-all">
          <div className="bingo-balls">
            <div className="bingo-container1">
              <div className="last-balls">
                <h1 className="bingo-h1-board new_text new_font">Tempo</h1>
              </div>
              <div className="bingo-time">
                <div className="time">{time}</div>
              </div>
            </div>
            <div className="bingo-container2">
              <h1 className="bingo-h1-currentball new_text new_font">
                Bola Atual
              </h1>
              <div className="bingo-current-ball">
                {renderCurrentBallAndKey()}
              </div>
              {renderButtonBingo()}
              {renderStartGameButtonToHostUser()}
              <h2 className="bingo-h2-yourcards new_text new_font">
                Suas Cartelas
              </h2>
            </div>
            <div className="bingo-container3">
              <div className="last-balls">
                <h1 className="bingo-h1-board new_text new_font ">
                  Quadro de Bolas
                </h1>
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
              <div className="bingo-buttons-help-share">
                <span className="bingo-container-help">
                  <button
                    onClick={openModalHelp}
                    className="bingo-button-help--bingo"
                  >
                    <img src={ingerrogacao} alt="" />
                  </button>
                </span>
                <span className="bingo-share">
                  <div className="container-share-img">
                    <img
                      src={share}
                      alt="compartilhe o link da sala com seus amigos"
                      className="bingo-share-img"
                      onClick={openModal}
                    />
                  </div>
                </span>
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
