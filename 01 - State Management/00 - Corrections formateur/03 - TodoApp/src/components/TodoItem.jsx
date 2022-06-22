import React, { useContext } from 'react';
import PropTypes from 'prop-types';

// TODO: Récupérez ici le contexte "TodoContext"
import { TodoContext } from '../contexts/todoContext';

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isDone: PropTypes.bool.isRequired
    }).isRequired
};

function TodoItem({ todo }) {

    // TODO: Récupérez ici la fonction "dispatch" détenue dans la valeur du contexte "TodoContext"
    const { dispatch } = useContext(TodoContext);

    function updateTodo(event) {
        const isDone = event.target.checked;

        // TODO :
        // Dispatchez ici une action pour modifier la todo
        dispatch({ type: 'UPDATE_TODO', payload: { ...todo, isDone } })
    }

    function deleteTodo() {
        // TODO :
        // Dispatchez ici une action pour supprimer la todo
        dispatch({ type: 'DELETE_TODO', payload: todo })
    }

    return (
        <div style={styles.container}>
            <input id={`todo_${todo.id}`} type="checkbox" checked={todo.isDone} onChange={updateTodo}/>
            <label htmlFor={`todo_${todo.id}`}>{todo.title}</label>
            <button style={styles.button} onClick={deleteTodo}>❌</button>
        </div>
    );
}

const styles = {
    container: {
        padding: '0.25rem 0.5rem'
    },
    button: {
        border: 'none',
        background: 'none',
        cursor: 'pointer'
    }
};

export default TodoItem;