import data from './_data';

import React, { useReducer } from 'react';

import TodoList from './components/TodoList';
import FormAddTodo from './components/FormAddTodo';

// TODO: Importez ici le "todoReducer"
import todoReducer from './reducers/todoReducer';
// TODO: Importez ici le "TodoContext"
import { TodoContext } from './contexts/todoContext';

function TodoApp() {

    // TODO: Utilisez ici le hook useReducer() avec le "todoReducer" pour récupérer le state
    const [state, dispatch] = useReducer(todoReducer, data);

    const areDone = state.filter(todo => todo.isDone).length;

    return (
        <div style={{ margin: '1rem' }}>
            <h1>Todolist Reducer App</h1>

            {/* // TODO: Afficher les bonnes informations en fonction du state */}
            <p><strong>{areDone}/{state.length} effectuée{areDone > 1 && 's'}</strong></p>

            {/* TODO: Enrobez ici les deux composant par le Provider du TodoContext,
            et passez comme valeur le 'state' et la fonction de 'dispatch' */}
            <TodoContext.Provider value={{state, dispatch}}>
                <TodoList todos={state} />
                <FormAddTodo />
            </TodoContext.Provider>

            {/* <pre>state = {JSON.stringify(state, null, 2)}</pre> */}
        </div>
    );

}

export default TodoApp;