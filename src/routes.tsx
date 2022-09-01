import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Bingo from "./pages/Bingo";
import Join from "./pages/join";
import Create from "./pages/Create";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Bingo/:roomId" element={<Bingo />}></Route>
        <Route path="/join/:roomId" element={<Join />}></Route>
        <Route path="/" element={<Create />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
