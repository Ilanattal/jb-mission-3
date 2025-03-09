import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#2C3E50", color: "white" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Accueil</Link>
      <Link to="/teams" style={{ color: "white", textDecoration: "none" }}>Équipes</Link>
      <Link to="/add-meeting" style={{ color: "white", textDecoration: "none" }}>Ajouter une réunion</Link>
    </nav>
  );
};

export default Navbar;