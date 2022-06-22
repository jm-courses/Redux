# React-Redux

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