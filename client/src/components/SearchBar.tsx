import type React from "react";
import { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import { missions } from "../../../server/data.ts";
import MissionModal from './missionModal';
import type { Mission } from '../types/types';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchText.trim()) {
      const suggestions = missions.filter((mission) =>
        mission.nom.toLowerCase().includes(searchText.toLowerCase().trim()),
      );
      setFilteredMissions(suggestions);
      setShowSuggestion(true);
    } else {
      setFilteredMissions([]);
      setShowSuggestion(false);
    }
  }, [searchText]);

  const handleSearch = () => {
    if (!searchText.trim()) {
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log("Veuillez saisir un texte avant de rechercher.");
      return;
    }
    const mission = filteredMissions[0] || null;
    setSelectedMission(mission);
    setShowSuggestion(false);
  };

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    setModalOpen(true);
    setShowSuggestion(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedMission(null); 
  setSearchText('');
  };

  return (
    <div className="component-searchbar" ref={searchBarRef}>
      <div className="search-bar">
        <input
          type="text"
          value={searchText}
          placeholder="Rechercher une mission..."
          className="search-input"
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="button" className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {showSuggestion && (
        <div className="suggestionList">
          <ul className="ul-suggestion-list">
            {filteredMissions.length > 0 ? (
              filteredMissions.slice(0, 5).map((mission) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<li
                  key={`mission-${mission.id}`}
                  className="li-suggestion-list"
                  onClick={() => handleMissionClick(mission)}
                >
                  <strong>{mission.nom}</strong>
                  <p className="text-muted">
                    {mission.categorie} • {mission.duree}
                  </p>
                </li>
              ))
            ) : (
              <li className="li-suggestion-list">Aucune mission trouvée.</li>
            )}
          </ul>
        </div>
      )}

      {selectedMission && !modalOpen && !showSuggestion && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div 
          className="mini-card mission-result"
          onClick={() => handleMissionClick(selectedMission)}
        >
          <div className="result-content">
            <h3>{selectedMission.nom}</h3>
            <p className="result-category">{selectedMission.categorie}</p>
            <p className="result-duration">Durée : {selectedMission.duree}</p>
            <p className="result-association">Association : {selectedMission.association}</p>
          </div>
          {selectedMission.imageUrl && (
            <div
              className="mini-card-img"
              style={{
                backgroundImage: `url(${selectedMission.imageUrl})`,
              }}
            />
          )}
        </div>
      )}

      <MissionModal
        open={modalOpen}
        selectedMission={selectedMission}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default SearchBar;