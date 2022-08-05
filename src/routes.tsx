import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Bingo from "./pages/Bingo";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Bingo" element={<Bingo />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
