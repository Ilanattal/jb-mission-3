import { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";
import "../components/TeamsList.css"

interface Team {
  id: number;
  name: string;
}

const TeamsList = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios.get("/teams")
      .then(response => setTeams(response.data))
      .catch(error => console.error("Error loading teams:", error));
  }, []);

  return (
    <div>
      <h2>Teams List</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <Link to={`/meetings/${team.id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;