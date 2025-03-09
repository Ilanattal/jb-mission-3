import { useEffect, useState } from "react";
import axios from "../services/api";
import "../components/AddMeetingForm.css";


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
      .catch(error => console.error("Error loading teams:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("/meetings", formData)
      .then(() => alert("Meeting successfully added!"))
      .catch(error => console.error("Error adding the meeting:", error));
  };

  return (
    <div>
      <h2>Add a Meeting</h2>
      <form onSubmit={handleSubmit}>
        <label>Development Team:</label>
        <select name="group_id" value={formData.group_id} onChange={handleChange} required>
          <option value="">Select a team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>

        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />

        <label>Room:</label>
        <input type="text" name="room" value={formData.room} onChange={handleChange} required />

        <label>Date and Time:</label>
        <input type="datetime-local" name="meeting_datetime" value={formData.meeting_datetime} onChange={handleChange} required />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddMeeting;