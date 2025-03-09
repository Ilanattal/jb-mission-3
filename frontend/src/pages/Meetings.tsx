import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import "../components/MeetingList.css";

interface Meeting {
  id: number;
  meeting_datetime: string;
  description: string;
  room: string;
  end_datetime: string;
}



const Meetings = () => {
  const { teamId } = useParams();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchMeetings();
  }, [teamId]);

  // Fonction pour récupérer les réunions
  const fetchMeetings = () => {
    axios.get(`/meetings/${teamId}`)
      .then(response => setMeetings(response.data))
      .catch(error => setError("Erreur lors de la récupération des réunions"));
  };

  // Fonction pour supprimer une réunion
  const deleteMeeting = async (meetingId: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette réunion ?")) {
      try {
        await axios.delete(`/meetings/${meetingId}`);
        setMeetings(meetings.filter(meeting => meeting.id !== meetingId)); // Mettre à jour la liste après la suppression
      } catch (error) {
        setError("Erreur lors de la suppression de la réunion");
      }
    }
  };

  return (
    <div>
      <h2>Réunions de l'équipe</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            {new Date(meeting.meeting_datetime).toLocaleString()} - {new Date(meeting.end_datetime).toLocaleString()} - {meeting.description} ({meeting.room})
            <button 
              onClick={() => deleteMeeting(meeting.id)} 
              style={{ marginLeft: "10px", color: "white", backgroundColor: "red", border: "none", padding: "5px 10px", cursor: "pointer" }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meetings;