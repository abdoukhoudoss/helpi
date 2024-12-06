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
  const [searchText, setSearchText] = useState<string>(""); // Texte de recherche
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]); // Missions filtrées
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null); // Mission sélectionnée
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false); // Contrôle des suggestions
  const searchBarRef = useRef<HTMLDivElement>(null); // Référence à la barre de recherche

  // Gestion des clics à l'extérieur de la barre de recherche
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestion(false); // Masque les suggestions
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filtrage des missions en fonction de la recherche
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
    // Sélectionner la première mission correspondant à la recherche
    const mission = filteredMissions[0] || null;
    setSelectedMission(mission); // Définit la mission sélectionnée
    setShowSuggestion(false); // Masque les suggestions
  };

  return (
    <div className="component-searchbar" ref={searchBarRef}>
      {/* Barre de recherche */}
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

      {/* Suggestions */}
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
        <div className="mini-card mt-4 p-4 bg-gray-800 rounded-md">
          <h3 className="text-lg font-semibold text-white">{selectedMission.nom}</h3>
          <p className="text-white">{selectedMission.description}</p>
          <p className="text-sm text-white">
            Association : <strong>{selectedMission.association}</strong>
          </p>
          <p className="text-sm text-white">Durée : {selectedMission.duree}</p>
          {selectedMission.imageUrl && (
            <div
              className="mini-card-img mt-2"
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
