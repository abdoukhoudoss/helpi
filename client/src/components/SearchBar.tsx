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
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false); // Contrôle des suggestions
  const searchBarRef = useRef<HTMLDivElement>(null); // Référence au conteneur de la barre de recherche

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
        mission.nom.toLowerCase().includes(searchText.toLowerCase())
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
    console.log("Rechercher :", searchText);
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
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Mission sélectionnée :", mission);
                    setSearchText(mission.nom); // Remplit l'input
                    setShowSuggestion(false); // Masque les suggestions
                  }}
                >
                  <strong>{mission.nom}</strong>
                  <p>{mission.categorie} • {mission.duree}</p>
                </li>
              ))
            ) : (
              <li className="li-suggestion-list">Aucune mission trouvée.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
