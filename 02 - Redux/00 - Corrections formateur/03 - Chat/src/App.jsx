import React, { createRef, useEffect, useState } from 'react';

// @TODO: Importez le store
import store from './stores/store';

function ReduxApp() {
    const inputRef = createRef();

    // @TODO: Remplacez ci-dessous le tableau vide [] par le contenu du store (= les messages)
    const [messages, setMessages] = useState(store.getState().messages);

    useEffect(() => {
        // @TODO: Invoquer le store subscribe ici pour mettre manuellement à jour la liste des messages avec "setMessages"
        store.subscribe(() => {
            setMessages(store.getState().messages);
        });
    }, []);

    function addMessage(event) {
        event.preventDefault();
        
        const newMessage = {
            date: Date.now(),
            text: inputRef.current.value
        };
        
        // @TODO: Dispatcher ici une action "ADD_MESSAGE" et un payload avec le nouveau message
        store.dispatch({ type: 'ADD_MESSAGE', payload: newMessage });

        inputRef.current.value = '';
    }

    function clearChat() {
        // @TODO: Dispatcher ici une action "CLEAR_CHAT"
        store.dispatch({ type: 'CLEAR_CHAT' });
    }

    return (
        <div style={{ margin: '1rem' }}>
            <h2>Redux</h2>
            <p>Micro-application de chat</p>

            {/* @TODO: Lister ici les messages du chat + leur date avec un .map classique */}
            {messages.map((message, index) => (
                <div key={index}>- <em>({new Date(message.date).toLocaleTimeString()})</em> {message.text}</div>
            ))}

            <form onSubmit={addMessage} style={{marginTop: '1rem'}}>
                <input type="text" ref={inputRef} placeholder="Chattez-ici …" />
                <button type="submit">Go</button>
            </form>

            <button style={{marginTop: '1rem', color: 'red'}} onClick={clearChat}>Effacer tous les messages du chat</button>
        </div>
    );
}

export default ReduxApp;