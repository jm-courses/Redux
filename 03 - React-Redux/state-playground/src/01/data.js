import { nanoid } from 'nanoid';

export default [
    { id: nanoid(), title: 'Nourrir le chat', isDone: true },
    { id: nanoid(), title: 'Faire les courses', isDone: false },
    { id: nanoid(), title: 'Apprendre React', isDone: true },
    { id: nanoid(), title: 'Apprendre les State Manager', isDone: false }
];