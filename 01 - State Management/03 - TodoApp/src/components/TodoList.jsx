import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            isDone: PropTypes.bool.isRequired
        }).isRequired
    )
};

function TodoList({ todos }) {
    return (
        <div style={styles.container}>
            {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </div>
    );
}

const styles = {
    container: {
        margin: '1rem'
    }
}

export default TodoList;