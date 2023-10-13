import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  // const { product, loading, error } = customReactQuery("/api/products");
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
          return;
        }
        setError(true);
        setLoading(false);
        console.log(error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [search]);

  return (
    <>
      <h1>Practising API calling</h1>
      {error && <h2>Error Occured</h2>}
      {loading && <h2>Loading</h2>}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>Number of products {product.length}</p>
    </>
  );
}

export default App;
