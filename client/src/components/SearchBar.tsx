import React, { useEffect, useRef, useState } from "react";
import "../styles/SearchBar.css";
import { missions } from "../../../server/data.ts";

interface Mission {
  id: number;
  nom: string;
  description: string;
  categorie: string;
  duree: string;
  nombreBenevoles: number;
  imageUrl?: string;
  association: string;
}

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>(""); 
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]); 
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false); 
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
        mission.nom.toLowerCase().includes(searchText.toLowerCase().trim())
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
      console.log("Veuillez saisir un texte avant de rechercher.");
      return;
    }
    
    const mission = filteredMissions[0] || null;
    setSelectedMission(mission); 
    setShowSuggestion(false); 
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
        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
        >
          🔍
        </button>
      </div>

      
      {showSuggestion && (
        <div className="suggestionList">
          <ul className="ul-suggestion-list">
            {filteredMissions.length > 0 ? (
              filteredMissions.slice(0, 5).map((mission) => (
                <li
                  key={`mission-${mission.id}`}
                  className="li-suggestion-list"
                  onClick={() => {
                    setSearchText(mission.nom); 
                    setShowSuggestion(false); 
                    setSelectedMission(mission);
                  }}
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

      
      {selectedMission && (
        <div className="mini-card ">
          <h3 className="nom-mission">{selectedMission.nom}</h3>
          <p className="description">{selectedMission.description}</p>
          <p className="association">
            Association : <strong>{selectedMission.association}</strong>
          </p>
          <p className="durée">Durée : {selectedMission.duree}</p>
          {selectedMission.imageUrl && (
            <div
              className="mini-card-img "
              style={{
                backgroundImage: `url(${selectedMission.imageUrl})`,
                height: "150px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
