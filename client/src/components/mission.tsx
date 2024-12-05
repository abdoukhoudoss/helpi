import { useState } from 'react';
import { missions } from "C:/Users/justi/OneDrive/desktop/Wild_Code_School/Protojam/helpi/server/data.ts";
import MissionModal from './missionModal.tsx';
import { Mission } from '../types/types.ts';
import "../styles/mission.css";

function MissionList() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (mission: Mission) => {
    console.log("Opening modal for mission:", mission)
    setSelectedMission(mission);
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Closing modal");
    setOpen(false);
    setSelectedMission(null);
  };

  return (
    <>
      <div className="missions-grid">
        {missions.map((mission: Mission) => (
          <div className="mission-container" key={mission.id}>
            <img
              className="mission-image"
              src={mission.imageUrl}
              alt={mission.nom}
              onClick={() => handleOpen(mission)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>

      <MissionModal
        open={open}
        selectedMission={selectedMission}
        onClose={handleClose}
      />
    </>
  );
}

export default MissionList;