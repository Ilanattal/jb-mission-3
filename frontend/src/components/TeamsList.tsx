import "./TeamsList.css";

// Définition du type pour un groupe de développement
type Team = {
  id: number;
  name: string;
};

interface TeamsListProps {
  teams: Team[]; // Correction : on précise que teams est un tableau d'objets de type Team
  onSelect: (teamId: number) => void; // La fonction qui sélectionne une équipe
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