const express = require("express");

const app = express();

const PORT = 3000;

app.get("/api/products", (req, res) => {
  const products = [
    { name: "woodden chair", price: 100 },
    { name: "sofa ", price: 150 },
    { name: "polyster chair", price: 23 },
    { name: "plastic stool", price: 54 },
  ];

  if (req.query.search) {
    const filterProducts = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    res.send(filterProducts);
    return;
  }

  setTimeout(() => {
    res.send(products);
  }, 3000);
});

app.listen(PORT, () => {
  console.log(`Listening at port number ${PORT}`);
});
