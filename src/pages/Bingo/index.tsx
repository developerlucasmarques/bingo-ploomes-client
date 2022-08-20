import React from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import bola from '../../assets/img/bola.png';
import { useState, useEffect } from 'react';
import { getRoom } from '../../services/bingoService';
import { GeneratedCard } from './types/generated-card.type';

const Bingo = () => {
  let { nickname } = useParams();

  const [style1, setStyle1] = useState('bingo-box-card-number');
  const [style2, setStyle2] = useState('bingo-box-card-number');
  const [style3, setStyle3] = useState('bingo-box-card-number');
  const [style4, setStyle4] = useState('bingo-box-card-number');
  const [style5, setStyle5] = useState('bingo-box-card-number');
  const [style6, setStyle6] = useState('bingo-box-card-number');
  const [style7, setStyle7] = useState('bingo-box-card-number');
  const [style8, setStyle8] = useState('bingo-box-card-number');
  const [style9, setStyle9] = useState('bingo-box-card-number');
  const [style10, setStyle10] = useState('bingo-box-card-number');
  const [style11, setStyle11] = useState('bingo-box-card-number');
  const [style12, setStyle12] = useState('bingo-box-card-number');
  const [style13, setStyle13] = useState('bingo-box-card-number');
  const [style14, setStyle14] = useState('bingo-box-card-number');
  const [style15, setStyle15] = useState('bingo-box-card-number');
  const [style16, setStyle16] = useState('bingo-box-card-number');
  const [style17, setStyle17] = useState('bingo-box-card-number');
  const [style18, setStyle18] = useState('bingo-box-card-number');
  const [style19, setStyle19] = useState('bingo-box-card-number');
  const [style20, setStyle20] = useState('bingo-box-card-number');
  const [style21, setStyle21] = useState('bingo-box-card-number');
  const [style22, setStyle22] = useState('bingo-box-card-number');
  const [style23, setStyle23] = useState('bingo-box-card-number');
  const [style24, setStyle24] = useState('bingo-box-card-number');
  const [style25, setStyle25] = useState('bingo-box-card-number');

  // const test = () =>{
  //   if(style == "bingo-box-card-number"){
  //   setStyle("bingo-box-card-number-2")
  //   }else{
  //     setStyle("bingo-box-card-number")
  //   }
  // }
  useEffect(() => {
    getAllDetails();
    handleSetCards();
  }, []);

  const [Nickame, setNickname] = useState();
  const [Score, setScore] = useState();
  const [CardB, SetCardB] = useState([]);
  const [CardI, SetCardI] = useState([]);
  const [CardN, SetCardN] = useState([]);
  const [CardG, SetCardG] = useState([]);
  const [CardO, SetCardO] = useState([]);
  const [Cards, SetCards] = useState<GeneratedCard[]>([]);

  const getAllDetails = async () => {
    const getroom = await getRoom.singleRoom();
    // console.log(getroom.data.users[0].user.nickname);
    setNickname(getroom.data.users[0].user.nickname);
    setScore(getroom.data.users[0].user.score);
    SetCardB(getroom.data.users[0].user.cards[0].numbers.B);
    SetCardI(getroom.data.users[0].user.cards[0].numbers.I);
    SetCardN(getroom.data.users[0].user.cards[0].numbers.N);
    SetCardG(getroom.data.users[0].user.cards[0].numbers.G);
    SetCardO(getroom.data.users[0].user.cards[0].numbers.O);
    // Card.map((numero: any) => {

    // });

    // console.log(Teste, "olaaaaa sou eu ");
  };

  const handleSetCards = async () => {
    const room = await getRoom.singleRoom();
    const cards: GeneratedCard[] = room.data.users[0].user.cards.map(
      (element: any) => element.numbers
    );

    SetCards(cards);
    console.log(cards);
    console.log(Cards);
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
                {nickname}
              </div>
              <h4 className="bingo-participant-h4">score:{Score}</h4>
            </div>
            {/* <div className="bingo-participant-container">
              <div className="bingo-participant-boxname">
                <img
                  className="bingo-participant-img"
                  src=" https://cdn-icons-png.flaticon.com/512/1/1247.png "
                  alt=""
                />
                {}
              </div>
              <h4 className="bingo-participant-h4">score:1</h4>
            </div> */}
            {/* <div className="bingo-participant-container">
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
            </div> */}
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
              <button className="bingo-button" type="button">
                Bingo
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
                    <td
                      onClick={() => {
                        style1 == 'bingo-box-card-number'
                          ? setStyle1(`bingo-box-card-number-2`)
                          : setStyle1('bingo-box-card-number');
                      }}
                      className={style1}
                    >
                      {element.B[0]}
                    </td>

                    <td
                      onClick={() => {
                        style2 == 'bingo-box-card-number'
                          ? setStyle2('bingo-box-card-number-2')
                          : setStyle2('bingo-box-card-number');
                      }}
                      className={style2}
                    >
                      {element.I[0]}
                    </td>
                    <td
                      onClick={() => {
                        style3 == 'bingo-box-card-number'
                          ? setStyle3('bingo-box-card-number-2')
                          : setStyle3('bingo-box-card-number');
                      }}
                      className={style3}
                    >
                      {element.N[0]}
                    </td>
                    <td
                      onClick={() => {
                        style4 == 'bingo-box-card-number'
                          ? setStyle4('bingo-box-card-number-2')
                          : setStyle4('bingo-box-card-number');
                      }}
                      className={style4}
                    >
                      {element.G[0]}
                    </td>
                    <td
                      onClick={() => {
                        style5 == 'bingo-box-card-number'
                          ? setStyle5('bingo-box-card-number-2')
                          : setStyle5('bingo-box-card-number');
                      }}
                      className={style5}
                    >
                      {element.O[0]}
                    </td>
                  </tr>
                  <tr className="bingo-box-card-number-tr">
                    <td
                      onClick={() => {
                        style6 == 'bingo-box-card-number'
                          ? setStyle6('bingo-box-card-number-2')
                          : setStyle6('bingo-box-card-number');
                      }}
                      className={style6}
                    >
                      {element.B[1]}
                    </td>
                    <td
                      onClick={() => {
                        style7 == 'bingo-box-card-number'
                          ? setStyle7('bingo-box-card-number-2')
                          : setStyle7('bingo-box-card-number');
                      }}
                      className={style7}
                    >
                      {element.I[1]}
                    </td>
                    <td
                      onClick={() => {
                        style8 == 'bingo-box-card-number'
                          ? setStyle8('bingo-box-card-number-2')
                          : setStyle8('bingo-box-card-number');
                      }}
                      className={style8}
                    >
                      {element.N[1]}
                    </td>
                    <td
                      onClick={() => {
                        style9 == 'bingo-box-card-number'
                          ? setStyle9('bingo-box-card-number-2')
                          : setStyle9('bingo-box-card-number');
                      }}
                      className={style9}
                    >
                      {element.G[1]}
                    </td>
                    <td
                      onClick={() => {
                        style10 == 'bingo-box-card-number'
                          ? setStyle10('bingo-box-card-number-2')
                          : setStyle10('bingo-box-card-number');
                      }}
                      className={style10}
                    >
                      {element.O[1]}
                    </td>
                  </tr>
                  <tr className="bingo-box-card-number-tr">
                    <td
                      onClick={() => {
                        style11 == 'bingo-box-card-number'
                          ? setStyle11('bingo-box-card-number-2')
                          : setStyle11('bingo-box-card-number');
                      }}
                      className={style11}
                    >
                      {element.B[2]}
                    </td>
                    <td
                      onClick={() => {
                        style12 == 'bingo-box-card-number'
                          ? setStyle12('bingo-box-card-number-2')
                          : setStyle12('bingo-box-card-number');
                      }}
                      className={style12}
                    >
                      {element.I[2]}
                    </td>
                    <td
                      onClick={() => {
                        style13 == 'bingo-box-card-number'
                          ? setStyle13('bingo-box-card-number-2')
                          : setStyle13('bingo-box-card-number');
                      }}
                      className={style13}
                    >
                      {element.N[2]}
                    </td>
                    <td
                      onClick={() => {
                        style14 == 'bingo-box-card-number'
                          ? setStyle14('bingo-box-card-number-2')
                          : setStyle14('bingo-box-card-number');
                      }}
                      className={style14}
                    >
                      {element.G[2]}
                    </td>
                    <td
                      onClick={() => {
                        style15 == 'bingo-box-card-number'
                          ? setStyle15('bingo-box-card-number-2')
                          : setStyle15('bingo-box-card-number');
                      }}
                      className={style15}
                    >
                      {element.O[2]}
                    </td>
                  </tr>
                  <tr className="bingo-box-card-number-tr">
                    <td
                      onClick={() => {
                        style16 == 'bingo-box-card-number'
                          ? setStyle16('bingo-box-card-number-2')
                          : setStyle16('bingo-box-card-number');
                      }}
                      className={style16}
                    >
                      {element.B[3]}
                    </td>
                    <td
                      onClick={() => {
                        style17 == 'bingo-box-card-number'
                          ? setStyle17('bingo-box-card-number-2')
                          : setStyle17('bingo-box-card-number');
                      }}
                      className={style17}
                    >
                      {element.I[3]}
                    </td>
                    <td
                      onClick={() => {
                        style18 == 'bingo-box-card-number'
                          ? setStyle18('bingo-box-card-number-2')
                          : setStyle18('bingo-box-card-number');
                      }}
                      className={style18}
                    >
                      {element.N[3]}
                    </td>
                    <td
                      onClick={() => {
                        style19 == 'bingo-box-card-number'
                          ? setStyle19('bingo-box-card-number-2')
                          : setStyle19('bingo-box-card-number');
                      }}
                      className={style19}
                    >
                      {element.G[3]}
                    </td>
                    <td
                      onClick={() => {
                        style20 == 'bingo-box-card-number'
                          ? setStyle20('bingo-box-card-number-2')
                          : setStyle20('bingo-box-card-number');
                      }}
                      className={style20}
                    >
                      {element.O[3]}
                    </td>
                  </tr>
                  <tr className="bingo-box-card-number-tr">
                    <td
                      onClick={() => {
                        style21 == 'bingo-box-card-number'
                          ? setStyle21('bingo-box-card-number-2')
                          : setStyle21('bingo-box-card-number');
                      }}
                      className={style21}
                    >
                      {element.B[4]}
                    </td>
                    <td
                      onClick={() => {
                        style22 == 'bingo-box-card-number'
                          ? setStyle22('bingo-box-card-number-2')
                          : setStyle22('bingo-box-card-number');
                      }}
                      className={style22}
                    >
                      {element.I[4]}
                    </td>
                    <td
                      onClick={() => {
                        style23 == 'bingo-box-card-number'
                          ? setStyle23('bingo-box-card-number-2')
                          : setStyle23('bingo-box-card-number');
                      }}
                      className={style23}
                    >
                      {element.N[4]}
                    </td>
                    <td
                      onClick={() => {
                        style24 == 'bingo-box-card-number'
                          ? setStyle24('bingo-box-card-number-2')
                          : setStyle24('bingo-box-card-number');
                      }}
                      className={style24}
                    >
                      {element.G[4]}
                    </td>

                    <td
                      onClick={() => {
                        style25 == 'bingo-box-card-number'
                          ? setStyle25('bingo-box-card-number-2')
                          : setStyle25('bingo-box-card-number');
                      }}
                      className={style25}
                    >
                      {element.O[4]}
                    </td>
                  </tr>
                </table>
              </span>
            ))}
          </div>
        </div>
      </body>
    </>
  );
};

export default Bingo;
