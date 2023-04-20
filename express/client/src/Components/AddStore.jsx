import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StoreContext } from '../Context/StoreContext';

export default function AddStore() {

    const { handleSubmit, setStoreName, setCity, setId } = useContext(StoreContext)

    useEffect(() => {
        // generate a new UUID and update the state
        const newId = uuidv4();
        setId(newId);
    }, []);

    return (
        <fieldset>
            <form onSubmit={handleSubmit}>
                <label >
                    Store Name:
                    <input type="text" onChange={(e) => setStoreName(e.target.value)} />
                </label>
                <label>
                    City:
                    <input type="text" onChange={(e) => setCity(e.target.value)} />
                </label>
                <button type="submit">Add Store +</button>
            </form>
        </fieldset>
    );
}
