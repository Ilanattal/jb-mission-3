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
  onDelete: (id: number) => void; // Delete function
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings, onDelete }) => {
  return (
    <div className="meeting-list">
      <h2>📅 Meeting List</h2>
      {meetings.length === 0 ? (
        <p>No meetings scheduled.</p>
      ) : (
        <table className="meeting-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Room</th>
              <th>Date and Time</th>
              <th>Action</th> {/* New column for the button */}
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id}>
                <td>{meeting.description}</td>
                <td>{meeting.room}</td>
                <td>{new Date(meeting.meeting_datetime).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(meeting.id)}
                  >
                    🗑 Delete
                  </button>
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