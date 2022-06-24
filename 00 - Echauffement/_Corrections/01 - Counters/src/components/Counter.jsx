import React, { useState } from "react";

function Counter({ demarrage }) {
  const [valeur, setValeur] = useState(demarrage ?? 0);

  function increment() {
    setValeur(valeur + 1);
  }

  function decrement() {
    setValeur(valeur - 1);
  }

  return (
    <div className="counter">
      <span>{valeur}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default Counter;
