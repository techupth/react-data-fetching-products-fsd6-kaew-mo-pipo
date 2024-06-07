import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  let status = "Loading...";
  async function getProduct() {
    try {
      // setLoading(true);
      const getResult = await axios.get("http://localhost:4001/products");
      setLoading(false);
      setProduct(getResult.data.data);
    } catch (error) {
      setLoading(false);
      console.log("Get DATA ERROR!!!");
      status = "Fetching Error...";
    }
  }

  async function removeProduct(productID) {
    const removeResult = await axios.delete(
      `http://localhost:4001/products/${productID}`
    );
    // const newData = products.filter((item) => {
    //   return item !== productID;
    // });
    // setProduct(newData);
    getProduct();
  }

  useEffect(() => {
    setLoading(true);
    getProduct();
  }, []);

  if (loading) {
    return <h1 className="waiting">{status}</h1>;
  } else {
    return (
      <div className="App">
        <div className="app-wrapper">
          <h1 className="app-title">Products</h1>
        </div>
        <div className="product-list">
          {products.map((item, index) => {
            return (
              <div className="product" key={index}>
                <div className="product-preview">
                  <img
                    src="https://via.placeholder.com/350/350"
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {item.name}</h1>
                  <h2>Product price: {item.price} Baht</h2>
                  <p>Product description: {item.description}</p>
                </div>

                <button
                  className="delete-button"
                  onClick={() => {
                    removeProduct(item.id);
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
}

export default App;
