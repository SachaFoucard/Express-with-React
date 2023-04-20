import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StoreContext } from '../Context/StoreContext';

export default function AddItem({ storeId }) {
    const { setNewItems, productName, setProductName, price, setPrice, discount, setDiscount, pic, setPic, setIdProduct, IdProduct } = useContext(StoreContext)

    const handleNewProduct = (event) => {
        event.preventDefault(); // prevent form submission from reloading the page
        if (!productName, !price, !discount, !pic) { alert('field empty'); }
        else {

            const id = IdProduct
            const name = productName

            const FormInfoProduct = {
                id,
                name,
                price,
                discount,
                pic
            }
            fetch(`http://localhost:8000/api/stores/${storeId}/items/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(FormInfoProduct)
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setNewItems((prev) => [...prev, FormInfoProduct]);
                })
        }
    }

    useEffect(() => {
        // generate a new UUID and update the state
        const newId = uuidv4();
        setIdProduct(newId);
    }, []);

    return (
        <fieldset>
            <form onSubmit={handleNewProduct}>
                <label >
                    name product :
                    <input type="text" onChange={(e) => setProductName(e.target.value)} />
                </label>
                <label>
                    price:
                    <input type="text" onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>
                    discount:
                    <input type="text" onChange={(e) => setDiscount(e.target.value)} />
                </label>
                <label>
                    pic URL:
                    <input type="text" onChange={(e) => setPic(e.target.value)} />
                </label>
                <button type="submit">Add Item +</button>
            </form>
        </fieldset>
    );
}

