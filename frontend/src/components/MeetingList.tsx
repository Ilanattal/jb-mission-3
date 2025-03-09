import React from "react";
import "./MeetingList.css";

interface Meeting {
  id: number;
  description: string;
  room: string;
  meeting_datetime: string;
  group_id: number;
}

interface MeetingListProps {
  meetings: Meeting[];
  onDelete: (id: number) => void;
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings, onDelete }) => {
  return (
    <div className="meeting-list">
      <h2>📅 Liste des réunions</h2>
      {meetings.length === 0 ? (
        <p>Aucune réunion prévue.</p>
      ) : (
        <table className="meeting-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Salle</th>
              <th>Date et Heure</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id}>
                <td>{meeting.description}</td>
                <td>{meeting.room}</td>
                <td>{new Date(meeting.meeting_datetime).toLocaleString()}</td>
                <td>
                  <button onClick={() => onDelete(meeting.id)}>🗑 Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MeetingList;