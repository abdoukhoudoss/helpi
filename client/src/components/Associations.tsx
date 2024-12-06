import { useState } from "react";
import "../styles/Associations.css";
import { missions } from "../../../server/data.ts";
import Modal from "./Modal.tsx";

const Associations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleOpenModal = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const filteredMissions = missions.filter(
    (mission) => mission.categorie === selectedCategory,
  );

  return (
    <div className="associations-container">
      <h1 className="title">ASSOCIATIONS</h1>
      <h2 className="subtitle">POPULAIRES</h2>
      <div className="associations-grid">
        <div className="association-card main">
          <div>
            <h1>AGISSEZ</h1>
            <h2>AVEC NOUS</h2>
          </div>
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a
            href="#"
            className="arrow"
            onClick={() => handleOpenModal("Toutes les catégories")}
          >
            →
          </a>
        </div>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="association-card"
          onClick={() => handleOpenModal("Aide alimentaire")}
        >
          <h3>ALIMENTAIRE</h3>
          <img src="./src/assets/images/resto-coeur.png" alt="alimentaire" />
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href="#" className="arrow">
            →
          </a>
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="association-card"
          onClick={() => handleOpenModal("Aide sociale")}
        >
          <h3>SECOURS POPULAIRE</h3>
          <img src="./src/assets/images/secours-pop.png" alt="secours" />
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href="#" className="arrow">
            →
          </a>
        </div>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="association-card"
          onClick={() => handleOpenModal("Aide matérielle")}
        >
          <h3>VÊTEMENT</h3>
          <img src="./src/assets/images/emmaus.png" alt="Vetement" />
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href="#" className="arrow">
            →
          </a>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2>{selectedCategory}</h2>
          <p>Liste des missions pour la catégorie "{selectedCategory}":</p>
          {filteredMissions.length > 0 ? (
            <ul>
              {filteredMissions.map((mission) => (
                <li key={mission.id}>
                  <h3>{mission.nom}</h3>
                  <p>{mission.description}</p>
                  <small>{mission.duree}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune mission trouvée pour cette catégorie.</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Associations;
