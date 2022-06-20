import { useState } from "react";
import Counter from "./components/Counter";

function App() {
  const [compteurs, setCompteurs] = useState([]);

  function ajoutCompteur() {
    setCompteurs([...compteurs, Date.now()]);
  }

  function supprimerCompteur() {
    setCompteurs(compteurs.slice(0, -1));
  }

  return (
    <div className="App">
      <div className="actions">
        <button onClick={ajoutCompteur}>Ajouter un compteur</button>
        <button onClick={supprimerCompteur}>Supprimer un compteur</button>
      </div>

      <div className="counters-container">
        {compteurs.map((time) => (
          <Counter key={time} demarrage={Math.round(Math.random() * 10)} />
        ))}
      </div>
    </div>
  );
}

export default App;
