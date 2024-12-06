import '../styles/Associations.css';

const Associations = () => {
  return (
    <div className="associations-container">
      <h1 className="title">ASSOCIATIONS</h1>
      <h2 className="subtitle">POPULAIRES</h2>
      <div className="associations-grid">
        <div className="association-card main">
          <div> <h1>AGISSEZ</h1>
          <h2>AVEC NOUS</h2>
          </div>
          <a href="#" className='arrow'>
           →
          </a>
        </div>
        <div className="association-card">
          <h3>ALIMENTAIRE</h3>
          <img src="./src/assets/images/resto-coeur.png" alt="alimentaire" />
          <a href="#" className="arrow">
             →
          </a>
        </div>
        <div className="association-card">
          <h3>SECOURS POPULAIRE</h3>
          <img src="./src/assets/images/secours-pop.png" alt="secours" />
          <a href="#" className="arrow">
             →
          </a>
        </div>
        <div className="association-card">
          <h3>VÊTEMENT</h3>
          <img src="./src/assets/images/emmaus.png" alt="Vetement" />
          <a href="#" className="arrow">
             →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Associations;
