import React, { createRef } from 'react';
import { nanoid } from 'nanoid';

// TODO: Récupérez ici le contexte "TodoContext"

function FormAddTodo() {
    const inputRef = createRef();

    // TODO: Récupérez ici la fonction "dispatch" détenue dans la valeur du contexte "TodoContext"

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
    }

    return (
        <form onSubmit={addTodo} >
            <input type="text" placeholder="Nouvelle tâche …" ref={inputRef} />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default FormAddTodo;