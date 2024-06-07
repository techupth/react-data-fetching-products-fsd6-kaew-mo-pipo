import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [blogProduct, setBlogProduct] = useState([]);

  const getProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setBlogProduct(result.data.data);
    console.log(result.data.data);
  };

  const deleteProduct = async (index) => {
    await axios.delete(`http://localhost:4001/products/${index}`);
  };

  const removeProduct = (indexProduct) => {
    const newBlogProduct = [...blogProduct];
    newBlogProduct.splice(indexProduct, 1);
    setBlogProduct(newBlogProduct);
  };

  useEffect(() => {
    getProduct();
    deleteProduct();
  }, []);
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {blogProduct.map((product, indexProduct) => {
          return (
            <div className="product" key={indexProduct}>
              <div className="product-preview">
                <img
                  src="https://via.placeholder.com/350/350"
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>

              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(product.id);
                  removeProduct(indexProduct);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
