import MissionList from "../components/mission";
import "../styles/HomeMission.css";

export function HomeMission() {
  return (
    <div className="homemission-page">
      <div className="homemission-title">
        <h1>MISSIONS</h1>
      </div>
      <div className="MissionList-container">
        <MissionList />
      </div>
    </div>
  );
}
