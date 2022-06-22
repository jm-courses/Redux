// @TODO :
// Complétez ici le reducer afin qu'il puisse permettre d'ajouter et supprimer une todo du state
// …

export default function todoReducer(/* … */state, action) {
    // Votre code ici …

    console.log('action dispatched!', action.type, action.payload)

    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload];
        
        case 'UPDATE_TODO':
            const updatedTodoIndex = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(updatedTodoIndex, 1, action.payload);
            return [...state];

        case 'DELETE_TODO':
            const todos = state.filter(({ id }) => id !== action.payload.id);
            return [...todos];
        
        default:
            return [...state]
    }
}
