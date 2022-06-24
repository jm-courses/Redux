const initialState = {
    messages: [
        { date: Date.now(), text: 'Hello Redux!' },
    ]
};

// @TODO: Ecrire (et exporter) le reducer (prenant en compte le state initial)
export default function messagesReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                messages: [
                    ...state.messages,
                    action.payload
                ]
            };

        case 'CLEAR_CHAT':
            return {
                messages: []
            };

        default:
            return state;
    }
}