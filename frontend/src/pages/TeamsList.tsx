import { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

interface Team {
  id: number;
  name: string;
}

const TeamsList = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios.get("/teams")
      .then(response => setTeams(response.data))
      .catch(error => console.error("Erreur lors du chargement des équipes :", error));
  }, []);

  return (
    <div>
      <h2>Liste des équipes</h2>
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