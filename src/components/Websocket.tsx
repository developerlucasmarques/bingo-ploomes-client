import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../contexts/WebsocketContext';

interface Message {
	id: string;
	name: string;
	text: string;
}

interface Payload {
	name: string;
	text: string;
}

export const Websocket = () => {
	const [name, setName] = useState('');
	const [value, setValue] = useState('');
	const [text, setText] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const socket = useContext(WebsocketContext);

	useEffect(() => {
		function receivedMessage(message: Payload) {
			const newMessage: Message = {
				id: uuid.v4(), // receive the user ID
				name: message.name,
				text: message.text,
			};
			setMessages([ ...messages, newMessage]);
		}

		socket.on('msgToClient', (message: Payload) => {
			receivedMessage(message);
		});
	}, [messages, name, text]);
  function validateInput() {
    return name.length > 0 && text.length > 0;
  }

  function onSend() {
    if (validateInput()) {
      const message: Payload = {
        name,
        text,
      };

      socket.emit('msgToServer', message);
      setText('');
    }
  }

	return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name..."
        />
        <div>
          <ul>
            {messages.map(message => {
              if (message.name === name) {
                return (
                  <p key={message.id}>
                    <span>
                      {message.name}
                      {' Msg says:'}
                    </span>

                    <p>{message.text}</p>
                  </p>
                );
              }

              return (
                <div key={message.id}>
                  <span>
                    {message.name}
                    {' Msg says:'}
                  </span>

                  <p>{message.text}</p>
                </div>
              );
            })}
          </ul>
        </div>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter message..."
        />
        <button type="button" onClick={() => onSend()}>
          Send
        </button>
      </div>
    </div>
  );
};
