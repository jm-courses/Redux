import React from 'react';

import data from './data';

import TodoList from './TodoList';
import FormAddTodo from './FormAddTodo';

// TODO: Importez ici le "todoReducer"
// TODO: Importez ici le "TodoContext"

function ReducerApp() {

    // TODO: Utilisez ici le hook useReducer() avec le "todoReducer"

    return (
        <div style={{ margin: '1rem' }}>
            {/* TODO: Enrobez ici les deux composant par le Provider du TodoContext,
            et passez comme valeur le 'state' et la fonction de 'dispatch' */}
            <TodoList todos={data} />
            <FormAddTodo />
        </div>
    );

}

export default ReducerApp;