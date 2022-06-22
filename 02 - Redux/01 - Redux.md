# Redux (Actions, Reducers, Store)

React propose la notion stable de context qui peut apporter des solutions. Mais pour une gestion plus complexe d'un state on utilisera de préférence Redux.

Redux fonctionne indépendemment de React et peut être utilisé seul. Avec Redux, on a comme avec le Context de React la notion de store, ce dernier est également **global**.

On pourra souscrire au state global, depuis n'importe quel composant, et récupérer les données du state en lecture seule. De même on pourra déclencher des actions depuis les composants afin de modifier le state global de Redux.

Redux impose un pattern au niveau de ses states. En effet,le state global sera notre source de vérité, à chaque fois qu'on voudra le changer on retournera une copie du state, sans toucher à la source de vérité.

## Présentation du reducer

**Redux c'est Reducer + flux ce qui donne Redux.**

Typiquement le reducer dans Redux est une fonction qui prend ses valeurs dans son state et les retourne modifiées, sans changer le state lui-même. Le pattern impose que pour des valeurs données le reducer retournera toujours le même état du state.

```js
const reducer = (state, action) => {
    /* return new state or state */
}
```

## Principes du Pattern Redux

- Une unique source de vérité pour les states.
- Le state est en "read-only" (lecture seule).
- Les changements du state sont faits par des fonctions pures, aucun effet de bord; pour une valeur donnée on retournera toujours la même valeur.


### Exemple

Nous importerons tout d'abord **createStore** tout en haut de notre fichier.

> **Note :**
> Depuis Avril 2022, il est conseillé d'utiliser `@reduxjs/toolkit` à la place de `redux`. Cependant, les concepts de `redux` restent en application, et sont encore utilisés sans Redux Toolkit dans beaucoup d'applications, c'est pourquoi il est intéressant de l'étudier dans ce cours.
> De plus, Redux Toolkit  fournit beaucoup d'éléments et peut être perturbant pour débuter.

```js
import { createStore } from 'redux';

// Définition de la source de vérité
const stateInit = {
    count : 0,
    questions : []
}
```

Puis nous définissons un reducer qui contiendra **la logique algorithmique** des changements du state. Notez que chaque modification du state se fait en fonction du paramètre **action.type**. Par défaut ces actions, constantes JS, sont écrites en majuscule :

```js
// Définition du Reducer
const questionsReducer = (state = stateInit, action = {}) => {
    // Gestion des actions du Reducer
    switch(action.type){
        case 'ADD_QUESTION':
           
           // On doit retourner un nouveau state (sans toucher à la source de vérité)
            return { 
                ...state, 
                questions : state.questions.concat(action.question),
                count : state.count + 1
            };

        // Si aucun changement de state
        default:
            return state;
    }
}

export default questionsReducer;
```

## Précision JS pour la modification du state dans Redux

Nous rappelons ci-dessous comment faire une copie d'un objet. Vous devez le mettre en place dans Redux; le pattern impose des fonctions pures pour retourner la copie du state modifiée.

### Rappels JS sur référence & copie

La technique ci-dessous ne marche pas si on a des objets dans des objets (références imbriquées).

```js
// source de vérité
const state = { a: 1, b: 2 };
// On veut modifier la valeur a dans la source de vérité
const deltaState = { a: 3};

// Copie du nouvel état sans modification du state (source de vérité)
const newState = { 
    ...state, 
    ...deltaState 
};

console.log(newState); // -> { a: 3, b: 2}

// En JS vous pouvez également écrire ceci
// pour créer une copie d'un objet
const nS = Object.assign({}, state, deltaState );
```

Nous allons maintenant créer le store et passer le reducer à ce dernier, la méthode getState nous retournera le contenu du store :

```js
import questionsReducer from 'questionsReducer';

// Création du store avec le reducer
const store = createStore(questionsReducer);

// état initial
console.log('state init', store.getState());
```

La méthode dispatch permet de dispatcher une action et des données. C'est dans le reducer que la logique du changement des données aura lieu :

```js
// Dispatcher des données pour une action
store.dispatch({
    type : 'ADD_QUESTION',
    question : "Comment compiler React ?"
});

// REDUCER ...

// Le store a changé son state
console.log('new state', store.getState());
```

### Subscribe

Pour écouter les changements du state on s'y abonnera à l'aide de la fonction subscribe du store, nous verrons plus tard un autre moyen pour récupérer le store de Redux dans les composants eux-mêmes.

```js
// s'abonner au store et écouter ses changements
store.subscribe(() => console.log(store.getState().questions) ) ;
```

## 02 Exemple Redux

Voyez dans les sources un exemple de code Redux pour vous faire une idée de son utilisation fichier **02_Example_Redux.html**.

Ouvrez ce fichier HTML dans un navigateur simple et ouvrez l'inspecteur d'élément (onglet "Console") pour tester les instructions basiques de Redux.


## 03 Exercice

Récupérez le dossier **`03 - Chat`** fourni, et installez les dépendances :

```bash
npm install
```

Lancez le projet :

```bash
npm start
```

Complétez dans les différents fichiers les annotations `// TODO` en commentaire pour faire fonctionner la TodoList.

Vous devez :

- Créer un store avec la fonction "createStore" de Redux
- Écrire le reducer pour ajouter un message au chat, et purger le chat
- Souscrire au store pour mettre à jour les données dans l'App
- Lister les messages du chat avec leur date et contenu
- Dispatcher les actions pour ajouter un message, et purger le chat
