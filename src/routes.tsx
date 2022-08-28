import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Bingo from "./pages/Bingo";
import Join from "./pages/join";
import Create from "./pages/Create";
import Soundpage from "./pages/soundbutton";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Bingo/:nickname" element={<Bingo />}></Route>
        <Route path="/join/:roomId" element={<Join />}></Route>
        <Route path="/" element={<Create />}></Route>
        <Route path="/sound" element={<Soundpage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
