import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import "./index.css";

Modal.setAppElement("#root");

const Modalcomponent = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [copy, setcopy] = useState(true);
  const [buttoncopy, setbuttoncopy] = useState("modal-button-copy-default");
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  let roomId = "salajacare";
  const copybutton = () => {
    navigator.clipboard.writeText(`http://127.0.0.1:5173/join/${roomId}`);
    setcopy(false);
    setbuttoncopy("modal-button-copy");
    setTimeout(() => {
      setcopy(true);
      setbuttoncopy("modal-button-copy-default");
    }, 5000);
  };

  return (
    <>
      <h1>
        udohasu9iAGDHBAuisdghBISU9DGHAbsdd9uioGHDBUa9iosdghbASUDIOGHabsdduioAHDBNau9dioGHBASUDIOhdgab
      </h1>
      <div className="container">
        <button onClick={openModal}>Convide seus amigos</button>
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
              placeholder={`http://127.0.0.1:5173/join/${roomId}`}
              value={`http://127.0.0.1:5173/join/${roomId}`}
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
      </div>
    </>
  );
};

export default Modalcomponent;
