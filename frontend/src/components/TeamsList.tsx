import "./TeamsList.css";

// Define the type for a development team
type Team = {
  id: number;
  name: string;
};

interface TeamsListProps {
  teams: Team[]; // Correction: specify that teams is an array of Team objects
  onSelect: (teamId: number) => void; // Function to select a team
}

const TeamsList: React.FC<TeamsListProps> = ({ teams, onSelect }) => {
  return (
    <div className="teams-list">
      {teams.map((team) => (
        <div key={team.id} className="team-item" onClick={() => onSelect(team.id)}>
          {team.name}
        </div>
      ))}
    </div>
  );
};

export default TeamsList;