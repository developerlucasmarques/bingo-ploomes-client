import React from "react";
import "./index.css";
import { useParams } from "react-router-dom";

const Bingo = () => {
  let { nickname } = useParams();

  console.log(nickname);

  return (
    <>
      <header>participants dddd</header>
      <body>
        <div className="participants">
          <li>{nickname}</li>
          <li>{nickname}</li>
          <li>{nickname}</li>
        </div>
        <div className="form">
          <form action="">
            <div className="chat">conversa</div>
            <input type="text" />
            <button className="button" type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="your-cards">
          <div className="card">card</div>
        </div>
      </body>
    </>
  );
};

export default Bingo;
