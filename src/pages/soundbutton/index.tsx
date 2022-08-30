import React, { useEffect, useState } from "react";
import cool_sound from "../../assets/sounds/cool_sound.mp3";
import seasa from "../../assets/sounds/seasa.mp3";
import { Howl } from "howler";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPlay,
  faPause,
  faRepeat,
  faVolumeXmark,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

const Soundpage = () => {
  const sound = new Howl({
    src: cool_sound,
    html5: true,
    onplay: () => {
      console.log("retomando a musica a musica");
    },
    onpause: () => {
      console.log("pausando a musica");
    },
    onmute: () => {
      console.log("musica mutada");
    },
  });

  const [state, setstate] = useState("faVolumeXmark");
  const [modalIsOpen, setIsOpen] = useState(false);

  const alert = "soundbutton";

  let onpause = false;
  let oqueha = false;
  let mudo = false;
  const fim = () => {
    if (oqueha == true) {
      sound.unload();
      oqueha = false;
    } else {
      console.log("nao tem nenhuma musica rodando ");
    }
  };
  const start = () => {
    if (oqueha == false) {
      sound.volume(0.1);
      sound.play();
      oqueha = true;
    } else {
      console.log("ja tem uma musica rodando ");
    }
  };
  const pause = () => {
    if (onpause == false) {
      onpause = true;
      sound.pause();
    } else {
      onpause = false;
      sound.play();
    }
  };

  const mute = (event: any) => {
    console.log(event);
    if (mudo == false) {
      sound.volume(0);
      mudo = true;
      console.log("mudo");
      //setalert("soundbuttondisable");
    } else {
      mudo = false;
      sound.volume(0.1);
      console.log("desmutado");
      //setalert("soundbutton");
    }

    const abrirmodal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };
  };
  return (
    <>
      <div className="olamundo">
        <h1>sonoplastia jacare trem bala</h1>
      </div>

      <div className="allmusic">
        <button>open modal</button>
        <FontAwesomeIcon
          onClick={start}
          icon={faPlay}
          className="fa-5x fa-pull-left"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          onClick={pause}
          icon={faPause}
          className="fa-5x fa-pull-left "
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          onClick={fim}
          icon={faRepeat}
          className="fa-5x fa-pull-left"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          onClick={mute}
          icon={faVolumeXmark}
          className="fa-5x fa-pull-left"
        ></FontAwesomeIcon>
      </div>
    </>
  );
};

export default Soundpage;
