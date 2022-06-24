import { nanoid } from 'nanoid';

const _data = [
    { id: nanoid(), title: 'Nourrir le chat', isDone: true },
    { id: nanoid(), title: 'Faire les courses', isDone: false },
    { id: nanoid(), title: 'Apprendre React', isDone: true },
    { id: nanoid(), title: 'Apprendre les State Manager', isDone: false }
];

export default _data;