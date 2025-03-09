import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import "../components/MeetingList.css";

interface Meeting {
  id: number;
  meeting_datetime: string;
  description: string;
  room: string;
}

const Meetings = () => {
  const { teamId } = useParams();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetchMeetings();
  }, [teamId]);

  // Fonction pour récupérer les réunions
  const fetchMeetings = () => {
    axios.get(`/meetings-per-team/${teamId}`)
      .then(response => setMeetings(response.data))
      .catch(error => console.error("Erreur lors du chargement des réunions :", error));
  };

  // Fonction pour supprimer une réunion
  const deleteMeeting = async (meetingId: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette réunion ?")) {
      try {
        await axios.delete(`/meetings/${meetingId}`);
        setMeetings(meetings.filter(meeting => meeting.id !== meetingId)); // Met à jour la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la réunion :", error);
      }
    }
  };

  return (
    <div>
      <h2>Réunions de l'équipe</h2>
      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            {new Date(meeting.meeting_datetime).toLocaleString()} - {meeting.description} ({meeting.room})
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