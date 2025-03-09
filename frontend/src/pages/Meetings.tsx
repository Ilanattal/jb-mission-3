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

  // Function to fetch meetings
  const fetchMeetings = () => {
    axios.get(`/meetings-per-team/${teamId}`)
      .then(response => setMeetings(response.data))
      .catch(error => console.error("Error loading meetings:", error));
  };

  // Function to delete a meeting
  const deleteMeeting = async (meetingId: number) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        await axios.delete(`/meetings/${meetingId}`);
        setMeetings(meetings.filter(meeting => meeting.id !== meetingId)); // Update list after deletion
      } catch (error) {
        console.error("Error deleting the meeting:", error);
      }
    }
  };

  return (
    <div>
      <h2>Team Meetings</h2>
      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            {new Date(meeting.meeting_datetime).toLocaleString()} - {meeting.description} ({meeting.room})
            <button 
              onClick={() => deleteMeeting(meeting.id)} 
              style={{ marginLeft: "10px", color: "white", backgroundColor: "red", border: "none", padding: "5px 10px", cursor: "pointer" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meetings;