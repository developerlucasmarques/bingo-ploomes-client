import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Bingo from "./pages/Bingo";
import Join from "./pages/join";
import Create from "./pages/Create";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Bingo/:nickname" element={<Bingo />}></Route>
        <Route path="/Join/:roomId" element={<Join />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
