import { lazy, Suspense } from 'react';

// =======================================================
// ADAPTEZ LA CONSTANTE EN FONCTION DE L'EXERCICE
// Ne modifiez pas le reste du code de ce fichier !
// Ne travaillez QUE dans les dossier /01/ , /02/ …etc. en fonction de l'exercice souhaité
// =======================================================

const CURRENT_EXERCICE = 1;

// =======================================================

function App() {
  const ExerciceComponent = lazy(
    () => import(`./${CURRENT_EXERCICE.toString().padStart(2, '0')}/index.jsx`)
  );
  return (
    <Suspense fallback={<p>Chargement de l'exercice {CURRENT_EXERCICE} …</p>}>
      <ExerciceComponent />
    </Suspense>
  );
}

export default App;