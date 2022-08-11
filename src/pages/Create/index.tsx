import React from "react";
import "./index.css";
import logo from "../../assets/imgs/logo.png";

const Create = () => {
  return (
    <>
      <body>
        <div>
          <div className="all">

            <h1><strong> Bingão do G5 </strong> </h1>

            <img src={logo} alt="logo" />
            <form action="">
              <input name="nickname" placeholder="nickname" type="text" />
              <input name="room" placeholder="nome da sala" type="text" />
               <span>
                <h2>Tempo</h2>
              <input name="timmer" className="slide" type="range" />
              <h2>Cartelas</h2>
              <input name="cards" className="slide" type="range" />
              </span>
              
              <button type="submit">
                
                <h2>Criar</h2></button>
                <span className="buttons">
                <button type="button" className="help"> ? </button>
                </span>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};

export default Create;
