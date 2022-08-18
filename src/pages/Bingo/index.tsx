import React from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import bola from "../../assets/img/bola.png";
import { useState } from "react";

const Bingo = () => {
  let { nickname } = useParams();

  console.log(nickname);

  const [style1, setStyle1] = useState("bingo-box-card-number")
  const [style2, setStyle2] = useState("bingo-box-card-number")
  const [style3, setStyle3] = useState("bingo-box-card-number")
  const [style4, setStyle4] = useState("bingo-box-card-number")
  const [style5, setStyle5] = useState("bingo-box-card-number")
  const [style6, setStyle6] = useState("bingo-box-card-number")
  const [style7, setStyle7] = useState("bingo-box-card-number")
  const [style8, setStyle8] = useState("bingo-box-card-number")
  const [style9, setStyle9] = useState("bingo-box-card-number")
  const [style10, setStyle10] = useState("bingo-box-card-number")
  const [style11, setStyle11] = useState("bingo-box-card-number")
  const [style12, setStyle12] = useState("bingo-box-card-number")
  const [style13, setStyle13] = useState("bingo-box-card-number")
  const [style14, setStyle14] = useState("bingo-box-card-number")
  const [style15, setStyle15] = useState("bingo-box-card-number")
  const [style16, setStyle16] = useState("bingo-box-card-number")
  const [style17, setStyle17] = useState("bingo-box-card-number")
  const [style18, setStyle18] = useState("bingo-box-card-number")
  const [style19, setStyle19] = useState("bingo-box-card-number")
  const [style20, setStyle20] = useState("bingo-box-card-number")
  const [style21, setStyle21] = useState("bingo-box-card-number")
  const [style22, setStyle22] = useState("bingo-box-card-number")
  const [style23, setStyle23] = useState("bingo-box-card-number")
  const [style24, setStyle24] = useState("bingo-box-card-number")
  const [style25, setStyle25] = useState("bingo-box-card-number")

  // const test = () =>{
  //   if(style == "bingo-box-card-number"){
  //   setStyle("bingo-box-card-number-2")
  //   }else{
  //     setStyle("bingo-box-card-number")
  //   }
  // }



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
                <div className="bingo-current-card">Cartela adversaria</div>
              </div>
            </div>
            <div className="bingo-container2">
              <h1 className="bingo-h1-currentball">current Ball</h1>
              <div className="bingo-current-ball">
                
                <img className="bingo-currentball-img" src={bola} alt="" />
                </div>
              <button className="bingo-button" type="button">
                Bingo
              </button>
              <h2 className="bingo-h2-yourcards">your-cards</h2>
            </div>
            <div className="bingo-container3">
              <h1 className="bingo-h1-board">Board</h1>
              <div className="bingo-before-balls">
                <div className="bingo-container-beforeballs">
                  <span className="bingo-beforeball"> <img className="bingo-ballimg" src= {bola} alt="" /> </span>
                  <span className="bingo-beforeball"><img className="bingo-ballimg" src= {bola} alt="" /></span>
                  <span className="bingo-beforeball"><img className="bingo-ballimg" src= {bola} alt="" /></span>
                </div>
                <div className="bingo-container-beforeballs">
                  <span className="bingo-beforeball"><img className="bingo-ballimg" src= {bola} alt="" /></span>
                  <span className="bingo-beforeball"><img className="bingo-ballimg" src= {bola} alt="" /></span>
                  <span className="bingo-beforeball"><img className="bingo-ballimg" src= {bola} alt="" /></span>
                </div>
              </div>

              <div className="bingo-supers">
                <form className="bingo-form-dropdown">
                <div className="bingo-select">
                <select className="bingo-dropdown" name="supers" id="supers">
                  <option className="bingo-option" value="blur">aplicar blur na tela do oponente</option>
                  <option className="bingo-option" value="blur">aoi</option>
                  <option className="bingo-option" value="blur">asdasdas</option>
                </select>
                </div>
                <div className="bingo-button-select">
                <button className="bingo-super-button" type="submit">Activate Super</button>
                </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bingo-cards">
            <span className="bingo-card">

            <table className="bingo-table-all">
<tr className="bingo-box-card-number-tr">
 <th className="bingo-th">B</th>
 <th className="bingo-th">I</th>
 <th className="bingo-th">N</th>
 <th className="bingo-th">G</th>
 <th className="bingo-th">O</th>
</tr>
<tr className="bingo-box-card-number-tr">
 <td  onClick= {() =>{style1 == "bingo-box-card-number" ? setStyle1("bingo-box-card-number-2"): setStyle1("bingo-box-card-number")}} className={style1} >11</td>
 <td  onClick= {() =>{style2 == "bingo-box-card-number" ? setStyle2("bingo-box-card-number-2"): setStyle2("bingo-box-card-number")}} className={style2} >11</td>
 <td  onClick= {() =>{style3 == "bingo-box-card-number" ? setStyle3("bingo-box-card-number-2"): setStyle3("bingo-box-card-number")}} className={style3} >11</td>
 <td  onClick= {() =>{style4 == "bingo-box-card-number" ? setStyle4("bingo-box-card-number-2"): setStyle4("bingo-box-card-number")}} className={style4} >11</td>
 <td  onClick= {() =>{style5 == "bingo-box-card-number" ? setStyle5("bingo-box-card-number-2"): setStyle5("bingo-box-card-number")}} className={style5} >11</td>
</tr>
<tr className="bingo-box-card-number-tr">
<td  onClick= {() =>{style6 == "bingo-box-card-number" ? setStyle6("bingo-box-card-number-2"): setStyle6("bingo-box-card-number")}} className={style6} >11</td>
<td  onClick= {() =>{style7 == "bingo-box-card-number" ? setStyle7("bingo-box-card-number-2"): setStyle7("bingo-box-card-number")}} className={style7} >11</td>
<td  onClick= {() =>{style8 == "bingo-box-card-number" ? setStyle8("bingo-box-card-number-2"): setStyle8("bingo-box-card-number")}} className={style8} >11</td>
<td  onClick= {() =>{style9 == "bingo-box-card-number" ? setStyle9("bingo-box-card-number-2"): setStyle9("bingo-box-card-number")}} className={style9} >11</td>
<td  onClick= {() =>{style10 == "bingo-box-card-number" ? setStyle10("bingo-box-card-number-2"): setStyle10("bingo-box-card-number")}} className={style10} >11</td>
</tr>
<tr className="bingo-box-card-number-tr">
<td  onClick= {() =>{style11 == "bingo-box-card-number" ? setStyle11("bingo-box-card-number-2"): setStyle11("bingo-box-card-number")}} className={style11} >11</td>
<td  onClick= {() =>{style12 == "bingo-box-card-number" ? setStyle12("bingo-box-card-number-2"): setStyle12("bingo-box-card-number")}} className={style12} >11</td>
<td  onClick= {() =>{style13 == "bingo-box-card-number" ? setStyle13("bingo-box-card-number-2"): setStyle13("bingo-box-card-number")}} className={style13} >11</td>
<td  onClick= {() =>{style14 == "bingo-box-card-number" ? setStyle14("bingo-box-card-number-2"): setStyle14("bingo-box-card-number")}} className={style14} >11</td>
<td  onClick= {() =>{style15 == "bingo-box-card-number" ? setStyle15("bingo-box-card-number-2"): setStyle15("bingo-box-card-number")}} className={style15} >11</td>
</tr>
<tr className="bingo-box-card-number-tr">
<td  onClick= {() =>{style16 == "bingo-box-card-number" ? setStyle16("bingo-box-card-number-2"): setStyle16("bingo-box-card-number")}} className={style16} >11</td>
<td  onClick= {() =>{style17 == "bingo-box-card-number" ? setStyle17("bingo-box-card-number-2"): setStyle17("bingo-box-card-number")}} className={style17} >11</td>
<td  onClick= {() =>{style18 == "bingo-box-card-number" ? setStyle18("bingo-box-card-number-2"): setStyle18("bingo-box-card-number")}} className={style18} >11</td>
<td  onClick= {() =>{style19 == "bingo-box-card-number" ? setStyle19("bingo-box-card-number-2"): setStyle19("bingo-box-card-number")}} className={style19} >11</td>
<td  onClick= {() =>{style20 == "bingo-box-card-number" ? setStyle20("bingo-box-card-number-2"): setStyle20("bingo-box-card-number")}} className={style20} >11</td>
</tr>
<tr className="bingo-box-card-number-tr">
<td  onClick= {() =>{style21 == "bingo-box-card-number" ? setStyle21("bingo-box-card-number-2"): setStyle21("bingo-box-card-number")}} className={style21} >11</td>
<td  onClick= {() =>{style22 == "bingo-box-card-number" ? setStyle22("bingo-box-card-number-2"): setStyle22("bingo-box-card-number")}} className={style22} >11</td>
<td  onClick= {() =>{style23 == "bingo-box-card-number" ? setStyle23("bingo-box-card-number-2"): setStyle23("bingo-box-card-number")}} className={style23} >11</td>
<td  onClick= {() =>{style24 == "bingo-box-card-number" ? setStyle24("bingo-box-card-number-2"): setStyle24("bingo-box-card-number")}} className={style24} >11</td>
<td  onClick= {() =>{style25 == "bingo-box-card-number" ? setStyle25("bingo-box-card-number-2"): setStyle25("bingo-box-card-number")}} className={style25} >11</td>
</tr>
</table>



            </span>
            <span className="bingo-card">card1</span>
            <span className="bingo-card">card1</span>
          </div>
        </div>
      </body>
    </>
  );
};

export default Bingo;



