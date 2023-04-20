import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddStore from '../Components/AddStore';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

function Stores() {
  // Get the stores and the LoadStore function from the StoreContext
  const { stores, LoadStore,storeId} = useContext(StoreContext)

  // Use Navigate hook to navigate to a specific store when clicking on it
  const navigator = useNavigate()

  // Function to navigate to a specific store
  const press = (storeId) => {
    navigator(`/${storeId}`)
  }

  // Load the stores when the component mounts or the stores array changes
  useEffect(() => {
    LoadStore()
  }, [stores.length])

  return (
    <>
      {/* AddStore component to add a new store */}
      <AddStore />
      <div className="App">
        <h1 style={{ color: 'white', textDecoration: 'underline' }}>ALL STORES </h1>
        {stores.length > 0 ? (
          // Grid to display all the stores
          <div className="grid">
            {stores.map(store => (
              <div key={store.id} onClick={() => press(store.id)} className="store">
                <h3 className="store-name">Store:{store.storeName}</h3>
                <h3 className="store-name">id:{store.id}</h3>
                <h3 className="store-name">City:{store.city}</h3>
                <div>
                  {/* Display all the items in the store */}
                  {store.items?.map((item) =>
                    <div>
                      <h3>name:{item.name}</h3>
                      <h3>price:{item.price}</h3>
                      <h3>discount:{item.discount}</h3>
                      <img src={item.pic} style={{ width: 100 }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Display loading message if stores are still being loaded
          <p style={{color:'white',fontSize:30}}>Loading...</p>
        )}
      </div>
    </>
  )
}

export default Stores
