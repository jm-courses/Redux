# Introduction à React-Redux

Le package `react-redux` est comme son nom l'indique une implémentation de Redux pour ReactJS.

Il apporte les éléments suivants en plus des fonction de Redux :

- Un composant `<Provider>` pour fournir le store à l'ensemble de l'application
- Deux hooks `useDispatch` et `useSelector`

Pour installer react-redux, il faut suivre les étapes suivantes:

```bash
npm install redux react-redux
```

> **Note :**
> Dans une application moderne, on utilisera désormais `@reduxjs/toolkit` à la place de `redux` seul. Cependant, Redux Toolkit est assez compliqué pour débuter. C'est pourquoi nous resterons pour l'instant sur `redux` seul.
> Il est plus facile de d'abord comprendre les concepts de `redux` dans le cadre d'une application complète pour pouvoir apprécier les outils fournis par Redux Toolkit.

## Le composant `<Provider>`

React-Redux fournit le un composant `<Provider>` (un peu comme l'API Context de ReactJS) qui permet d'injecter le store dans l'arborescence des composants enfants.

Ce Provider dispose d'une unique `props` nommée `store`, qui doit contenir le store créé avec Redux.

On commence d'abord par créer le store :

```js
import { createStore } from 'redux';

const store = createStore(
  rootReducer
);
```

Puis, on l'injecte à la racine de l'application (ou à un niveau d'arborescence élévé) :

```jsx
import { Provider } from 'react-redux';

…

return (
    <Provider store={store}>
        <main className="container">
            {/* Suite de l'application …*/}
        </main>
    </Provider>
);
```

Une fois le Provider en place, on va pouvoir récupérer facilement le store dans les composants enfants.

## Le hook `useSelector`

Ce hook permet simplement de récupérer le store fourni par le Provider. Il permet aussi d'aller sélectionner un élément plus précis du store, dans le cas où ce dernier aurait une structure plus complexe.

Il s'utilise dans un composant se trouvant dans le Provider.

Exemple : Soit le state suivant :
```
{
    user: {
        name: 'John Doe',
        age: 42,
    },
    basket: {
        items: [
            { id: 1, title: 'Next-gen smartphone charging cable' },
            { id: 2, title: 'Next-gen smartphone' },
        ]
    }
}
```

Dans un composant permettant d'afficher l'utilisateur, on pourrait procéder comme suit :

```jsx
import { useSelector } from 'react-redux';

export const UserComponent = () => {
    const user = useSelector((state) => state.user);
    
    // user = { name: 'John Doe', age: 42 },
}
```

L'avantage étant que le composant `UserComponent` ne se re-render **que** si c'est la partie `state.user` qui est modifiée.

Une modification comme ici l'ajout d'un article dans le panier `basket` n'aura aucun effet sur le re-rendering du composant `UserComponent`.

## Le hook `useDispatch`

Le pattern Redux veut que l'on puisse « dispatcher » des actions depuis les composants, pour mettre à jour le state.

Le hook `useDispatch` permet simplement de récupérer la fonction de dispatch que l'on peut utiliser dans les composants à l'intérieur du Provider :

```jsx
import { useSelector } from 'react-redux';

const dispatch = useDispatch()

dispatch({ type: 'NOM_ACTION', payload: 'donnée' });
```
