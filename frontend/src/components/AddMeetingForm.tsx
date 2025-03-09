import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMeetingForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [teamId, setTeamId] = useState<number | "">("");
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);

  // Récupérer les équipes depuis l'API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teams");
        setTeams(response.data); // Mettre à jour la liste des équipes
      } catch (err) {
        console.error("Erreur lors de la récupération des équipes", err);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMeeting = {
      meeting_datetime: date,
      end_datetime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(), // Ajouter 1 heure pour l'heure de fin
      group_id: Number(teamId),
      description,
      room,
    };

    try {
      await axios.post("http://localhost:3001/meetings", newMeeting);
      alert("Réunion ajoutée avec succès !");
      // Réinitialiser le formulaire après soumission
      setDescription("");
      setRoom("");
      setDate("");
      setTeamId("");
    } catch (error) {
      alert("Erreur lors de l'ajout de la réunion");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={teamId}
        onChange={(e) => setTeamId(Number(e.target.value))}
        required
      >
        <option value="">Sélectionner une équipe</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Salle"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddMeetingForm;