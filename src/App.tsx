import AppRoutes from "./routes";

import "./App.css";
import { socket, WebsocketProvider } from "./contexts/WebsocketContext";
import { Websocket } from "./components/Websocket";

function App() {
  <WebsocketProvider value={socket}>
    <Websocket />
  </WebsocketProvider>
  return <AppRoutes />;
}

export default App;
