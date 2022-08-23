import React, { useEffect, useState } from "react";
import bola from "../../assets/img/bola.png";
import { getRoom } from "../../services/bingoService";
import "./index.css";
import { GeneratedCard } from "./types/generated-card.type";
import swall from "sweetalert";
import { useNavigate } from "react-router-dom";

const Bingo: React.FC = () => {
  useEffect(() => {
    getAllDetails();
    handleSetCards();
  }, []);

  const [Nickame, setNickname] = useState();
  const [Score, setScore] = useState();
  const [Cards, SetCards] = useState<GeneratedCard[]>([]);

  const getAllDetails = async () => {
    const getroom = await getRoom.singleRoom();
    setNickname(getroom.data.users[0].user.nickname);
    setScore(getroom.data.users[0].user.score);
  };

  const handleSetCards = async () => {
    const room = await getRoom.singleRoom();
    const cards: GeneratedCard[] = room.data.users[0].user.cards.map(
      (element: any) => element.numbers
    );

    SetCards(cards);
  };

  const handleBackground = (event: React.SyntheticEvent) => {
    if (event.currentTarget.className == "number background-color-number") {
      event.currentTarget.classList.remove("background-color-number");
    } else {
      event.currentTarget.classList.add("background-color-number");
    }
  };

  const modalHelpCreate = () => {};

  const modalPoints = () => {
    if (1 > 0) {
      swall({
        icon: "error",
        title: "Você não bingou e perdeu 1 ponto",
        timer: 3000,
      });
    } else {
      swall({
        icon: "succes",
        title: "Você bingou e ganhou 1 ponto",
        timer: 3000,
      });
    }
  };

  const Navigate = useNavigate();

  const nomeWinner = "test";

  const modalWin = () => {
    swall({
      icon: "info",
      title: `${nomeWinner} ganhou o jogo`,
      text: `${nomeWinner} fez 10 pontos e venceu o jogo, cria uma nova sala ou entre em uma nova para continuar jogando`,
      timer: 5000,
    });
    setTimeout(() => {
      Navigate("/");
    }, 5000);
  };

  const modalHelpBingo = () => {
    swall({
      icon: "info",
      title:"Como Vencer?",
      text:`Para pontuar, voce deve completar uma fileira na vertical, horizontal ou diagonal de cada tabela
             
            Voce deve completar 10 pontos para vencer a partida`,
      
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
                <h2>timer</h2>
                <img className="bingo-currentball-img" src={bola} alt="" />
              </div>

              
              <button onClick={modalWin} className="bingo-button" type="button">
                Bingo
              </button>

              <div className="bingo-help">
              
              <button
                  onClick={modalHelpBingo}
                  type="button"
                  className="bingo-button-help"
                >
                  ?
                </button>
              </div>

              

              
              <h2 className="bingo-h2-yourcards">your-cards</h2>
            </div>
            <div className="bingo-container3">
              <h1 className="bingo-h1-board">Board</h1>
              <div className="bingo-before-balls">
                <div className="bingo-container-beforeballs">
                  <span className="bingo-beforeball">
                    <img className="bingo-ballimg" src={bola} alt="" />{" "}
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
