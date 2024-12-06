import { useState } from "react";
import { missions } from "../../../server/data.ts";
import type { Mission } from "../types/types.ts";
import MissionModal from "./missionModal.tsx";

import "../styles/mission.css";
import OptimizedImage from "./OptimizedImage";

function MissionList() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (mission: Mission) => {
    console.log("Opening modal for mission:", mission);
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
            <OptimizedImage
              src={mission.imageUrl}
              alt={mission.nom}
              onClick={() => handleOpen(mission)}
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
