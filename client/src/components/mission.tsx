import { missions } from "C:/Users/justi/OneDrive/desktop/Wild_Code_School/Protojam/helpi/server/data.ts";

import "../styles/mission.css";

const MissionList: React.FC = () => {
  return (
    <div className="missions-grid">
      {missions.map((mission) => (
        <div className="mission-container" key={mission.id}>
          <img
            className="mission-image"
            src={mission.imageUrl}
            alt={mission.nom}
          />
        </div>
      ))}
    </div>
  );
};

export default MissionList;
