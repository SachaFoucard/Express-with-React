import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext';
import AddItem from '../Components/AddItem';

export default function Store() {
    const { storeId } = useParams(); // to get from Stores.jsx and put it into the fetch URL
    const [store, setStore] = useState({ items: [] }); // state to hold store data
    const nav = useNavigate() // hook for programmatic navigation

    const { newItems } = useContext(StoreContext) // access to StoreContext and its methods

    // function to navigate to Item.jsx with specific storeId and itemId
    const ItemTo = (storeId, itemId) => {
        nav(`/${storeId}/${itemId}`)
    }

    // function to fetch store data from backend API
    const loadData = async () => {
        try {
            let data = await fetch(`http://localhost:8000/api/stores/${storeId}`)
            let res = await data.json();
            setStore(res) // set state with fetched store data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData() // fetch store data when component mounts or storeId changes
    }, [storeId,newItems])

    return (
        <>
        <AddItem storeId={storeId}/>
            <div className="store">
                <h1 className="store-name">Store : {store?.storeName}</h1> {/* display store name */}
                <h3 className="store-details">Store Details:</h3>
                <div className="items-list">
                    {store && store.items && store.items.length > 0 ? ( // check if items exist
                        store.items.map((item) => // display list of items in store
                            <div className="item" key={item.id}>
                                <img src={item.pic} alt={item.name} className="item-image" onClick={() => ItemTo(store?.id, item.id, store.storeName,)} /> {/* navigate to item page with storeId and itemId */}
                                <div className="item-details">
                                    <h4 className="item-name">{item.name}</h4>
                                    <p className="item-price">Price: {item.price} {item.currency}</p>
                                    {item.discount > 0 &&
                                        <p className="item-discount">Discount: {item.discount}%</p>
                                    }
                                    <button className="add-to-cart">Add to cart</button>
                                </div>
                            </div>
                        )
                    ) : (
                        <p style={{ fontSize: 30 }}>Empty Products</p> // print "empty" if the array items is empty
                    )}
                </div>
            </div>
        </>
    )

}

