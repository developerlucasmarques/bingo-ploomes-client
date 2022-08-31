import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoom } from "../../services/bingoService";
import { useSocket } from "./hooks/useSocket";
import { sounds } from "./howler/howler";
import "./index.css";
import {
  modalAddPoints,
  modalRemovePoints,
  modalUserMadePoint,
} from "./modals/modals";
import { DrawnNumberAndKey } from "./types/drawn-number-key.type";
import { GeneratedCard } from "./types/generated-card.type";
import { ReceivedBalls } from "./types/received-balls.type";
import { RoomUsersCards } from "./types/room-users-and-user-self-cards.type";
import { UserMessage } from "./types/user-message.type";
import { UserSocket } from "./types/user-socket";
import { UserWhithSelf } from "./types/user-whith-self.type";
import { VerifyBingo } from "./types/verify-bingo-response.type";
import Modal from "react-modal";
import swall from "sweetalert";
import send from "../../assets/icons/send.png";
import share from "../../assets/icons/share.png";

Modal.setAppElement("#root");

const Bingo: React.FC = () => {
  useEffect(() => {
    getAllDetails();
  }, []);

  const socket = useSocket(
    "https://bingo-ploomes-server-production.up.railway.app/",
    {
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
      autoConnect: false,
    }
  );

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
  const [message, setMessage] = useState<string>("");
  const [chatPayload, setChatPayload] = useState<UserMessage[]>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [copy, setcopy] = useState(true);
  const [buttoncopy, setbuttoncopy] = useState("modal-button-copy-default");

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
    setScore(user?.score);
    setUserId(user?.id);
    setRoomId(room.id);
    startTime = room.ballTime;
    setStartTime(room.ballTime);
    setStartGameUserHost(user?.host);

    socket.emit("create-room-and-user", {
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
  }, [socket]);

  const StartListners = () => {
    socket.io.on("reconnect", (attempt) => {
      console.log("Reconnected on attempt: " + attempt);
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.log("Reconnection attempt: " + attempt);
    });
  };

  const handleBackground = (event: React.SyntheticEvent) => {
    if (event.currentTarget.className == "number background-color-number") {
      event.currentTarget.classList.remove("background-color-number");
    } else {
      event.currentTarget.classList.add("background-color-number");
    }
  };

  const userReconnect = () => {
    socket.on("user-reconnect", (balls: ReceivedBalls) => {
      setBallExist(true);
      setLastSixBalls(balls.lastSixBalls);
      setNewBall(balls.ballAndKey);

      setTimeout(() => {
        currentBall.current?.classList.remove("animation-spin-ball");
      }, 600);
    });
  };

  const newUser = () => {
    socket.on("new-user", (user: UserSocket[]) => {
      setUsersLogged(user);
    });
  };

  const startGame = (event: React.SyntheticEvent) => {
    event.currentTarget.classList.add("bingo-button-display-none");

    setTime(StartTime);

    socket.emit("start-game", { roomId: RoomId, userId: UserId });

    setShowButtonStartGame(false);
  };

  const showAndRemoveButtonStart = () => {
    socket.on("button-start", (showButton: boolean) => {
      if (showButton) {
        setShowButtonStartGame(true);
      } else {
        setShowButtonStartGame(false);
      }
    });
  };

  const showAndRemoveButtonBingo = () => {
    socket.on("button-bingo", (boolean: boolean) => {
      if (boolean) {
        setShowButtonBingo(true);
        console.log("showBingo true");
      } else {
        console.log("showBingo false");
        setShowButtonBingo(false);
      }
    });
  };

  const renderStartGameButtonToHostUser = () => {
    if (startGameUserHost && showButtonStartGame) {
      return (
        <button onClick={startGame} className="start-button" type="button">
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
        scrollRefSelf.current?.scrollIntoView({ behavior: "smooth" });
        // bodyRef.current?.scrollIntoView();das
      } else {
        scrollRefMessage.current?.scrollIntoView({ behavior: "smooth" });
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
    socket.on("new-ball", (balls: ReceivedBalls) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setTime(startTime);
      }

      socket.on("stop-balls", (stop: boolean) => {
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

      currentBall.current?.classList.add("animation-spin-ball");

      setTimeout(() => {
        currentBall.current?.classList.remove("animation-spin-ball");
      }, 600);
    });
  };

  const bingo = () => {
    socket.emit("check-bingo", { roomId: RoomId, userId: UserId });
  };

  const checkIfUserBingo = () => {
    socket.on("verify-bingo", (element: VerifyBingo) => {
      if (element.bingo) {
        clearInterval(intervalRef.current);
        setScore(element.score);
        modalAddPoints();
      }
      if (!element.bingo) {
        modalRemovePoints();
        sounds[1].play();
      }
    });

    socket.on("user-made-point", (nickname) => {
      modalUserMadePoint(nickname.nickname);
      clearInterval(intervalRef.current);
    });
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value.trim();
    if (!message) {
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
    socket.emit("chat-msg", payload);

    setMessage("");
    event.preventDefault();
  };

  const chatListener = () => {
    socket.on("new-message", (payload: UserMessage[]) => {
      setChatPayload(payload);
    });
  };

  let jwtsecret = localStorage.getItem("jwtToken");
  const Navigate = useNavigate();
  if (!jwtsecret) {
    Navigate(`/join/${RoomId}`);
  }

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const copybutton = () => {
    navigator.clipboard.writeText(
      `https://bingo-ploomes-client-caan00ctr-mlucasdev.vercel.app/join/${RoomId}`
    );
    setcopy(false);
    setbuttoncopy("modal-button-copy");
    setTimeout(() => {
      setcopy(true);
      setbuttoncopy("modal-button-copy-default");
    }, 5000);
  };

  const openModalHelp = () => {
    swall({
      icon: "info",
      title: "como jogar",
      text: ` - Para  fazer um ponto voce deve completar uma linha vertical ou horizontal ou diagonal em uma das suas cartelas

              - depois de completar uma linha aperte o botão de Bingo 

              - se você apertar o botão de Bingo sem completar uma linha recebera uma punição

              - o primeiro que bingar corretamente ganha a partida
      
      `,
    });
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="example modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <h1>para convidar seus amigos copie o Link</h1>
        <hr />
        <div className="divcopy">
          <input
            className="input-copy-invite"
            type="text"
            placeholder={`https://bingo-ploomes-client-caan00ctr-mlucasdev.vercel.app/join/${RoomId}`}
            value={`https://bingo-ploomes-client-caan00ctr-mlucasdev.vercel.app/join/${RoomId}`}
          />
          {copy == true ? (
            <button className={buttoncopy} onClick={copybutton}>
              copy
            </button>
          ) : (
            <button className={buttoncopy} onClick={copybutton}>
              copied
            </button>
          )}
        </div>

        <div className="modal-close-button">
          <button onClick={closeModal}>fechar</button>
        </div>
      </Modal>

      <body className="bingo-body">
        <div ref={bodyRef} className="bingo-chat">
          <div className="bingo-participantes">
            <div className="participantes-title">
              <h1 className="bingo-h1-participants">Participantes</h1>
            </div>
            <div className="bingo-participant-container-is-self">
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
            {usersLogged?.map((user) => {
              if (user.id != UserId) {
                return (
                  <div className="bingo-participant-container">
                    <div className="bingo-participant-boxname">
                      <img
                        className="bingo-participant-img"
                        src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                        alt=""
                      />
                      {user.nickname}
                    </div>
                    <h4 className="bingo-participant-h4">
                      Pontos: {user.score}
                    </h4>
                  </div>
                );
              }
            })}
          </div>
          <div className="bingo-messages">
            <div className="bingo-messages-border">
              <div className="bingo-chat-background">
                {/* <h2>CHAT</h2> */}
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
                <h1 className="bingo-h1-board">Tempo</h1>
              </div>
              <div className="bingo-time">
                <div className="time">{time}</div>
              </div>
            </div>
            <div className="bingo-container2">
              <h1 className="bingo-h1-currentball">Bola Atual</h1>
              <div className="bingo-current-ball">
                {renderCurrentBallAndKey()}
              </div>
              {renderButtonBingo()}
              {renderStartGameButtonToHostUser()}
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
              <div className="bingo-buttons-help-share">
                <span className="bingo-container-help">
                  <button
                    onClick={openModalHelp}
                    className="bingo-button-help--bingo"
                  >
                    ?
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
