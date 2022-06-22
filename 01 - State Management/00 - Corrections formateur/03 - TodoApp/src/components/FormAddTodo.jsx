import React, { createRef, useContext } from 'react';
import { nanoid } from 'nanoid';

// TODO: Récupérez ici le contexte "TodoContext"
import { TodoContext } from '../contexts/todoContext';

function FormAddTodo() {
    const inputRef = createRef();

    // TODO: Récupérez ici la fonction "dispatch" détenue dans la valeur du contexte "TodoContext"
    const { dispatch } = useContext(TodoContext);

    function addTodo(event) {
        event.preventDefault();

        const title = inputRef.current.value;
        const newTodo = {
            id: nanoid(),
            title,
            isDone: false
        };

        // @TODO :
        // Dispatchez une action pour ajouter la nouvelle todo 'newTodo' dans le state
        // …
        dispatch({ type: 'ADD_TODO', payload: newTodo });
    }

    return (
        <form onSubmit={addTodo} >
            <input type="text" placeholder="Nouvelle tâche …" ref={inputRef} />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default FormAddTodo;