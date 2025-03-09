import React, { useEffect, useState } from "react";
import axios from "axios";

interface Team {
  id: number;
  name: string;
}

const TeamsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Récupérer les équipes depuis l'API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teams");
        setTeams(response.data);  // Mettre à jour l'état avec la liste des équipes
        setLoading(false);  // Fin du chargement
      } catch (err) {
        setError("Erreur lors de la récupération des équipes");
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);  // L'effet se déclenche une seule fois au montage du composant

  // Affichage de l'état de chargement, de l'erreur ou de la liste des équipes
  if (loading) {
    return <div>Chargement des équipes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Liste des équipes</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;