import messagesReducer from '../reducers/messagesReducer';

// @TODO: Créer (et exporter) un nouveau store avec la fonction "createStore" de redux,
//  et lui passer le reducer des messages.

import { createStore } from 'redux'

const store = createStore(messagesReducer);

export default store;