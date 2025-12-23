import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./Components/Menu";
import Admin from "./Components/Admin";
import Navbar from './Components/Navbar';
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <nav className="nav">
          <Link to="/">Menu</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
