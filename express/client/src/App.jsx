import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Styles/App.css'
import './Styles/index.css'
import Stores from './Pages/Stores'
import Store from './Pages/Store';
import Item from "./Pages/Item";
import StoreContextProvider from "./Context/StoreContext";

function App() {

  return (
    <>
      <StoreContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Stores />} />
            <Route path="/:storeId" element={<Store />} />
            <Route path="/:storeId/:itemId" element={<Item />} />
          </Routes>
        </BrowserRouter>
      </StoreContextProvider>
    </>
  )
}

export default App
