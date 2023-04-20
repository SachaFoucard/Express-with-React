import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Item() {
  const { itemId, storeId } = useParams();
  const [product, setProduct] = useState();

  const loadDatas = async () => {
    try {
      let data = await fetch(`http://localhost:8000/api/stores/${storeId}/${itemId}`)
      let res = await data.json();
      setProduct(res)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadDatas();
  }, []);

  return (
    <div className="item-container">
      {product && (
        <div className="item-card">
          <h2 className="item-name">{product.name}</h2>
          <img className="item-image" src={product.pic} alt={product.name} />
          <p className="item-price">Price: {product.price}</p>
          <p className="item-discount">Discount: {product.discount}</p>
        </div>
      )}
    </div>
  )
}