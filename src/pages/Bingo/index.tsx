import React from "react";
import "./index.css";
import { useParams } from "react-router-dom";

const Bingo = () => {
  let { nickname } = useParams();

  console.log(nickname);

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
                Jacare
              </div>
              <h4 className="bingo-participant-h4">score:1</h4>
            </div>
            <div className="bingo-participant-container">
              <div className="bingo-participant-boxname">
                <img
                  className="bingo-participant-img"
                  src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                  alt=""
                />
                Jacare
              </div>
              <h4 className="bingo-participant-h4">score:1</h4>
            </div>
            <div className="bingo-participant-container">
              <div className="bingo-participant-boxname">
                <img
                  className="bingo-participant-img"
                  src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                  alt=""
                />
                Jacare
              </div>
              <h4 className="bingo-participant-h4">score:1</h4>
            </div>
            <div className="bingo-participant-container">
              <div className="bingo-participant-boxname">
                <img
                  className="bingo-participant-img"
                  src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                  alt=""
                />
                Jacare
              </div>
              <h4 className="bingo-participant-h4">score:1</h4>
            </div>
            <div className="bingo-participant-container">
              <div className="bingo-participant-boxname">
                <img
                  className="bingo-participant-img"
                  src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                  alt=""
                />
                Jacare
              </div>
              <h4 className="bingo-participant-h4">score:1</h4>
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
                <div className="bingo-current-card">
                  Cartela adversaria
                </div>
              </div>
            </div>
            <div className="bingo-container2">
              <h1 className="bingo-h1-currentball">current Ball</h1>
              <div className="bingo-current-ball"></div>
              <button className="bingo-button" type="button">
                Bingo
              </button>
              <h2 className="bingo-h2-yourcards">your-cards</h2>
            </div>
            <div className="bingo-container3">
              <h1 className="bingo-h1-board">Board</h1>
              <div className="bingo-before-balls">beforeballs</div>

              <div className="bingo-supers">supers</div>
            </div>
          </div>
          <div className="bingo-cards">
            <span className="bingo-card">card1</span>
            <span className="bingo-card">card1</span>
            <span className="bingo-card">card1</span>
          </div>
        </div>
      </body>
    </>
  );
};

export default Bingo;
