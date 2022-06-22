import Counter from "./components/Counter";

function App() {

  return (
    <div className="App">
      <div className="actions">
        <button>Ajouter un compteur</button>
        <button>Supprimer un compteur</button>
      </div>

      <div className="counters-container">
        <Counter demarrage={2} />
        <Counter demarrage={5} />
        <Counter demarrage={1}/>
        <Counter />
      </div>
    </div>
  );
}

export default App;
