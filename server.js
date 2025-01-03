const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());

// Serve static files from the "products" directory
app.use("/products", express.static(path.join(__dirname, "products")));

// Endpoint to get product data
app.get("/api/products", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "products.json"),
    "utf8",
    (err, data) => {
      if (err) {
        res.status(500).json({ error: "Failed to read product data" });
        return;
      }
      res.json(JSON.parse(data));
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
