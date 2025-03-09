import { useEffect, useState } from "react";
import axios from "../services/api";

interface Team {
  id: number;
  name: string;
}

const AddMeeting = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [formData, setFormData] = useState({
    group_id: "",
    description: "",
    room: "",
    meeting_datetime: "",
  });

  useEffect(() => {
    axios.get("/teams")
      .then(response => setTeams(response.data))
      .catch(error => console.error("Erreur lors du chargement des équipes :", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("/meetings", formData)
      .then(() => alert("Réunion ajoutée avec succès !"))
      .catch(error => console.error("Erreur lors de l'ajout de la réunion :", error));
  };

  return (
    <div>
      <h2>Ajouter une réunion</h2>
      <form onSubmit={handleSubmit}>
        <label>Groupe de développement :</label>
        <select name="group_id" value={formData.group_id} onChange={handleChange} required>
          <option value="">Sélectionner une équipe</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>

        <label>Description :</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />

        <label>Salle :</label>
        <input type="text" name="room" value={formData.room} onChange={handleChange} required />

        <label>Date et heure :</label>
        <input type="datetime-local" name="meeting_datetime" value={formData.meeting_datetime} onChange={handleChange} required />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddMeeting;