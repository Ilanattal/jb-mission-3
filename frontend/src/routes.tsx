import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeamsList from "./pages/TeamsList";
import Meetings from "./pages/Meetings";
import AddMeeting from "./pages/AddMeeting";
import Navbar from "./components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/meetings/:teamId" element={<Meetings />} />
        <Route path="/add-meeting" element={<AddMeeting />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;