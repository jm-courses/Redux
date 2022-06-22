import React from 'react';

import data from './_data';

import TodoList from './components/TodoList';
import FormAddTodo from './components/FormAddTodo';

// TODO: Importez ici le "todoReducer"
// TODO: Importez ici le "TodoContext"

function TodoApp() {

    // TODO: Utilisez ici le hook useReducer() avec le "todoReducer" pour récupérer le state

    return (
        <div style={{ margin: '1rem' }}>
            <h1>Todolist Reducer App</h1>

            {/* // TODO: Afficher les bonnes informations en fonction du state */}
            <p><strong>2/4 effectuées</strong></p>

            {/* TODO: Enrobez ici les deux composant par le Provider du TodoContext,
            et passez comme valeur le 'state' et la fonction de 'dispatch' */}
            <TodoList todos={data} />
            <FormAddTodo />
        </div>
    );

}

export default TodoApp;