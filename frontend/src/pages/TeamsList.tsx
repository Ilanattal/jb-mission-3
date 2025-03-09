import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";
import "../components/TeamsList.css";

interface Team {
  id: number;
  name: string;
}

const TeamsList = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:3001/teams")
      .then(response => setTeams(response.data))
      .catch(error => {
        setError("Erreur lors de la récupération des équipes");
        console.error("Error loading teams:", error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des équipes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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