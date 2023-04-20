import React, { createContext } from 'react'
import { useState } from 'react';

export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
    const [stores, SetStores] = useState([])

    // states create a new store
    const [id, setId] = useState('');
    const [storeName, setStoreName] = useState('');
    const [city, setCity] = useState('');
    const [items, setitems] = useState([]);

    //states create new product into store (items=[id,name,price,discount,pic])
    const [newItems, setNewItems] = useState([]);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [pic, setPic] = useState();
    const [IdProduct, setIdProduct] = useState();



    // get all stores with their products
    const LoadStore = async () => {
        let data = await fetch('http://localhost:8000/api/stores');
        let res = await data.json()
        SetStores(res)
    }

   


// post new store 
const handleSubmit = (event) => {
    event.preventDefault(); // prevent form submission from reloading the page
    if (!storeName && !city) { alert('field empty'); }
    else {
        const FormInfos = {
            id,
            storeName,
            city,
            items
        }

        fetch("http://localhost:8000/api/stores/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(FormInfos)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                SetStores((prev) => [...prev, FormInfos]);
            });
    }
};

const value = {
    SetStores,
    stores,
    LoadStore,
    handleSubmit,
    setId,
    setStoreName,
    setCity,
    setitems,
    setNewItems,
    newItems,
    setProductName,
    productName,
    price,
    setPrice,
    discount,
    setDiscount,
    pic,
    setPic,
    setIdProduct,
    IdProduct
}

return (
    <>
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    </>
)
}
