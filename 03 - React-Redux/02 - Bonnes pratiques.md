# Bonnes pratiques d'une app React-Redux

Afin de pouvoir travailler correctement avec une base propre d'application utilisant React-Redux, nous allons voir certaines **conventions** que vous retrouverez dans beaucoup de bases de code.

### 1. Assembler plusieurs reducers avec `combineReducers`

Sur une application web de moyenne ou grande envergure, il se peut que le state global contienne beaucoup d'informations de nature différente

```js
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

Il convient alors de séparer les reducers pour faciliter la gestion des actions.

```js
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            …
        case 'SET_AGE':
            …
    }
}
```
```js
const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ARTICLE':
            …
        case 'REMOVE_ARTICLE':
            …
        case 'PURGE':
            …
    }
}
```

Il est alors possible d'utiliser `combineReducers` (une méthode de `redux`) pour assembler les reducers ensemble dans un **rootReducer** :

```js
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  basket: basketReducer,
});

const store = createStore(rootReducer);
```

Le store va assembler chaque élément modifié par chaque reducer pour un state global.

Il sera ensuite facile dans un composant de sélectionner chaque partie en fonction des besoins avec `useSelector` :

```js
const user = useSelector(state => state.user);
const basket = useSelector(state => state.basket);
```

### 2. Utiliser des Action Types et Creators

Lorsqu'on « dispatche » une action, on invoque généralement la fonction de la sorte :

```js
const newArticle = { … };

dispatch({ type: 'ADD_ARTICLE', payload: newArticle });
```

Cependant, l'écriture peut devenir fastidieuse, sans compter que les mots comme `ADD_ARTICLE` où `PURGE`, sensés donner une indication pour un être humain, peuvent être amenés à être modifiés au fil du temps.

Il faudrait alors modifier ces noms partout où ils sont utilisés dans l'application, ainsi que dans les reducers concernés.

C'est pourquoi on préfère créer ce qu'on appelle des **Action Types** et des **Actions Creators**.

Globalement, un "action type" est une simple constante JavaScript contenant le nom de l'action dans un langage humain. On les place généralement dans un fichier à part, nommé `types.js` :

```js
export const SET_NAME       = 'SET_NAME';
export const SET_AGE        = 'SET_AGE';
```

Le nommage des constantes est libre. Le but étant d'avoir un emplacement unique pour stocker les noms des actions.

Les "action creators" permettent, eux, de fabriquer l'objet qui sera dispatché.

```js
// Import des "action types"
import { SET_NAME, SET_AGE } from './types';

// Déclaration des "action creators" :

export function setUserName(name) {
  return {
    type: SET_NAME,
    payload: name,
  };
}

export function setUserAge(age) {
  return {
    type: SET_AGE,
    payload: age,
  };
}
```

Grâce à ces fonctions, il devient moins fastidieux (et plus maintenable) de réaliser des **dispatch** dans les composants de l'application :

```js
import { useDispatch } from 'react-redux';
import { setUserName, setUserAge } from './actions';

dispatch(setUserName('JM'));
dispatch(setUserAge(42));
```