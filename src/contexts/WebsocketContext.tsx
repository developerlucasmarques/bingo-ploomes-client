import { createContext  } from "react";
import { io, Socket } from 'socket.io-client'

export const socket = io('https://bingo-g5-front.onrender.com/');
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
