import { useState } from "react";
import "./AddMeetingForm.css";

// Définition du type de réunion
interface Meeting {
  description: string;
  room: string;
  meeting_datetime: string;
  group_id: number;
}

// Définition du type des props
interface AddMeetingFormProps {
  addMeeting: (meeting: Meeting) => void;
  teams: { id: number; name: string }[];
}

const AddMeetingForm: React.FC<AddMeetingFormProps> = ({ addMeeting, teams }) => {
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [teamId, setTeamId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !room || !date || !teamId) {
      alert("Tous les champs sont requis !");
      return;
    }

    addMeeting({
      description,
      room,
      meeting_datetime: date,
      group_id: Number(teamId),
    });

    // Réinitialisation du formulaire
    setDescription("");
    setRoom("");
    setDate("");
    setTeamId("");
  };

  return (
    <form className="meeting-form" onSubmit={handleSubmit}>
      <select value={teamId} onChange={(e) => setTeamId(Number(e.target.value))}>
        <option value="">Sélectionner une équipe</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salle"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddMeetingForm;