import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, update } from './userSlice'

export function User() {
    const user = useSelector(selectUser)
    console.log('user=', user)
    const dispatch = useDispatch();

    return (
        <div>
            {<h1>User {user.name}</h1>}
            <input type="text" defaultValue="John Doe" onInput={(event) => dispatch(update(event.target.value))} />
        </div>
    );
}