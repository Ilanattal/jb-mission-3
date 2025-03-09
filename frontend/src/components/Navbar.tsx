import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#2C3E50", color: "white" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/teams" style={{ color: "white", textDecoration: "none" }}>Teams</Link>
      <Link to="/add-meeting" style={{ color: "white", textDecoration: "none" }}>Add a Meeting</Link>
    </nav>
  );
};

export default Navbar;