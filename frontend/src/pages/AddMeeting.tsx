import React, { useState, useEffect } from "react";
import axios from "../services/api";

const AddMeeting = () => {
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    group_id: "",
    description: "",
    room: "",
    meeting_datetime: "",
    end_datetime: ""
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Récupérer les équipes
    axios.get("/teams")
      .then(response => setTeams(response.data))
      .catch(err => setError("Erreur lors du chargement des équipes"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/meetings", formData);
      alert("Réunion ajoutée avec succès !");
      setFormData({
        group_id: "",
        description: "",
        room: "",
        meeting_datetime: "",
        end_datetime: ""
      });
    } catch (err) {
      setError("Erreur lors de l'ajout de la réunion");
    }
  };

  return (
    <div>
      <h2>Ajouter une réunion</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>Équipe :</label>
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

        <label>Date et heure fin :</label>
        <input type="datetime-local" name="end_datetime" value={formData.end_datetime} onChange={handleChange} required />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddMeeting;