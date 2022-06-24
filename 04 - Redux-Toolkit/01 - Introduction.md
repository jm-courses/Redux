# Redux Toolkit (RTK)

Redux Toolkit est un wrapper écrit au dessus de `redux` qui offre une nouvelle façon d'organiser les éléments d'une application Redux.

Jusqu'à présent, Redux seul n'impose en rien l'organisation de ces éléments. Il permet simplement de créer un store, y associer un "root reducer" et des middlewares.

Le développement d'applications plus complexes impose une certaines rigueur : il faut créer ses propres Action Types et Action Creators, écrire et combiner, manuellement les reducers de chaque partie de l'application, nommer correctement chaque élément, et souvent appliquer des middleware utiles comme `redux-thunk` pour gérer les actions asynchrones.

### Les slices

Dans une application React/Redux plus classique, nous organisions ces éléments dans plusieurs dossiers séparés :

```
.
├── actions
├── reducers
├── store
└── services
```

Redux Toolkit propose une nouvelle convention permettant de regrouper tous ces éléments dans un seul fichier, appelé une **Slice**.

Une Slice ("**part**" en Français) représente l'ensemble d'un élément du state, avec ses actions, ses reducers et sa logique générale.

L'arborescence proposée pour un élement est de les ranger dans un unique dossier `features/` :

```
.
└── features/
    ├── user/
    │   └── user-slice.js
    └── basket/
        └── basket-slice.js
```

Chaque slice représente la logique d'un ensemble de données pour une partie (tranche -> slice) de notre state Redux.

On configure une Slice avec un objet, comportant 3 propriétés obligatoires :

- `name` : Le nom de la slice (que l'on retrouvera notamment dans les action types)
- `initialState` : La valeur initiale du state de cette slice
- `reducers` : (au pluriel) Un objet contenant les fonctions de "cases" (que l'on mettait avant dans un `switch()`

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    
    initialState: {
        value: 0
    },
    
    reducers: {
        increment(state) {
            state.value++;
        },
        decrement(state) {
            state.value--;
        }
    }
});

/* Au singulier : il s'agit du reducer qui assemble les FONCTIONS "REDUCERS"
   renseignées au dessus. */
export default counterSlice.reducer;
```

La première chose de remarquable dans les reducers est que l'on **peut** faire muter le state (chose qu'il est normalement interdite de faire dans un reducer classique) :

```js
    increment(state) {
        state.value++;
    },
```

L'explication vient du fait que ces fonctions de réduction sont enrobées en interne par la bibliothèque [Immer.js](https://immerjs.github.io/immer/).

Cela rend beaucoup plus pratique la modification d'un state, car on n'est plus obligé de gérer nous-même l'immutabilité :

```js
// Sans Immer.js 😭😭😭
updateTodo(state) {
    const nextState = state.slice();
    nextState[1] = {
        ...nextState[1],
        done: true
    };
    nextState.push({title: "Tweet about it"});
    return nextState;
}
```
```js
// Avec Immer.js 😎😎😎
updateTodo(state) {
    state[1].done = true;
    state.push({title: "Tweet about it"});
}
```

##### Actions Creators

Les fonctions "action creators" sont également automatiquement créées à partir des fonctions de réduction.

Elles sont renseignées dans la propriété `.actions` de la slice :

```js
// Export des "action creators", qui sont automatiquement créées à partir des reducers !
export const { increment, decrement } = counterSlice.actions;
```

Puis dans un composant  :
```jsx
import { increment } from './features/counter/counter-slice.js';
…
function Counter() {
    …
    return (
        {/* Dispatche une action type nommée : "counter/increment"}> */}
        <button onClick={() => dispatch(increment())}>
            Increment counter
        </button>
    )
}
```

### Le store

Le concept d'un store global ne change pas de Redux seul.

On continue de le ranger dans un dossier à part des features :

```
.
├── features
└── app/
    └── store.js
```

Avec Redux seul, on utilisait la fonction `createStore()` pour créer un nouveau store.

Avec RTK (Redux Toolkit) cependant, on va maintenant créer ce store à l'aide de la fonction `configureStore()` (qui n'est qu'un simple wrapper autour de `createStore`) :

```js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    …
});
```

Parmis les avantages de **configureStore**, il y a :

- **Il se connecte seul à Redux Devtools**
    Plus besoin d'ajouter `window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()`
- **Il propose d'emblée le middleware "thunk"**
    Pour les actions asynchrones
- **Il active des alertes supplémentaires**
    Pour éviter de commettre des erreurs classiques, comme des mutations accidentelles.

```js
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counter-slice';
import userReducer from '../features/user/user-slice';

export const store = configureStore({
    // Invoque automatiquement "combineReducers":
    reducer: {
        counter: counterReducer,
        user: userReducer,
    }
});
```

#### Le `<Provider>` :

Ensuite, dans l'app normale, on inclus comme d'habitude le Provider :

```jsx
import { Provider } from 'react-redux';
import { store } from './app/store';

…

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### Utilisation dans les composants

Il suffit d'importer comme d'habitude `useDispatch` et `useSelector`, ainsi que les actions depuis la slice :

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { incremented } from './features/counter/counter-slice.js';

function Counter() {
    const counter = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>{counter}</div>

        <button onClick={() => dispatch(increment())}>
            Increment counter
        </button>
    )
}
```

À noter que l'utilisation d'un **payload** est automatiquement renseigné dans les reducers d'une slice :

```js
const counterSlice = createSlice({
    …
    reducers: {
        incrementByAmount(state, action) {
            state.value += action.payload;
            // "action.payload" contient l'information passée en argument de l'action creator
        }
    }
});

export const { … , incrementByAmount } = counterSlice.actions;
```

```jsx
import { incrementByAmount } from './features/counter/counter-slice.js';
…

<button onClick={() => dispatch(incrementByAmount(3))}>
    Increment by 3
</button>
```


### Thunk pour la gestion asynchrone

Un **thunk** est une fonction middleware qui permet à un "action creator" de renvoyer une fonction qui va dispatcher une action plus tard dans le temps.

Avant RTK, il fallait installer manuellement ce middleware avec le store. Mais RTK l'inclus et l'active automatiquement, il est donc d'ores-et-déjà disponible.

Dans le fichier Slice, on va récupérer une fonction pour fabriquer un thunk :

```js
import { createAsyncThunk } from '@reduxjs/toolkit';

// 1er argument = nom affiché pour les action/types
// 2ème argument = créateur de payload, doit toujours être une fonction asynchrone !
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('/todos/all');
    const todos = await response.json();

    return todos;
});
```

Ensuite dans la Slice en elle-même, on va pouvoir créer des `extraReducers`, que l'on pourra configurer avec un objet `builder` pour déterminer les différents States lors des états de la fonction asynchrone.

La fonction `fetchTodos` au dessus pourra se trouver dans 3 états (comme les promesses ):

- `pending`
- `fulfilled`
- `rejected`

Suivant l'état du **thunk**, on détermine la valeur du State pour cette Slice :

```js
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        …
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idle';
                state.todos = [...action.payload]
            })
    }
});
```

Et après il suffit de dispatcher l'action depuis un composant :

```jsx
import { useDispatch } from 'react-redux';
import { fetchTodos } from './features/todos/todo-slice.js';

function TodoApp() {
    const dispatch = useDispatch();

    dispatch(fetchTodos());
}
```

---

# Annexes : Liens utiles

https://youtu.be/9zySeP5vH9c

Why Redux Toolkit is How To Use Redux Today?
https://redux.js.org/introduction/why-rtk-is-redux-today

React Redux Quick Start (with RTK)
https://react-redux.js.org/tutorials/quick-start

Redux Essentials, Part 2: Redux App Structure
https://redux.js.org/tutorials/essentials/part-2-app-structure

Redux Fundamentals, Part 8: Modern Redux with Redux Toolkit
https://redux.js.org/tutorials/fundamentals/part-8-modern-redux