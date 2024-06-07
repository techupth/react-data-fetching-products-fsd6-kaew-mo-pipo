import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);

  const getDataProduct = async () => {
    try {
      setStatus("loading");
      const products = await axios.get("http://localhost:4001/products");
      console.log(products.data.data);
      setData(products.data.data);
      setStatus(null);
    } catch (error) {
      setStatus("failed");
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      await getDataProduct();
      // const newData = [...data];
      // newData.splice(index, 1);
      // setData(newData);
      // console.log(newData);
    } catch (error) {
      alert("Delet Error");
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {status === "loading" && <h1>Loading...</h1>}
        {status === "failed" && <h1>Fetching Error...</h1>}

        {data.map((item, index) => (
          <div className="product" key={index}>
            <div className="product-preview">
              <img
                src={item.image}
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
              onClick={() => deleteProduct(item.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
