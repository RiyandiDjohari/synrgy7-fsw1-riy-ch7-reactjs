import React, { useState } from "react";
import Product from "./Product";
import { Box, Button, TextField, Typography } from "@mui/material";

const ProductList = ({ products, handleSearchProducts, handleAddProduct }) => {
  const [product, setProduct] = useState("");
  return (
    <Box sx={{ mt: "3rem", borderTop: "2px solid #000", pt: "1rem"}}>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Box>
          <Typography variant="h5">Search Product</Typography>
          <TextField
            variant="standard"
            color="primary"
            sx={{ backgroundColor: "#eee", p: "10px", borderRadius: "4px" }}
            onChange={(e) => handleSearchProducts(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="h5">Add Product</Typography>
          <TextField
            variant="standard"
            color="primary"
            sx={{ backgroundColor: "#eee", p: "10px", borderRadius: "4px" }}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <Button
            sx={{ ml: "10px" }}
            variant="contained"
            size="large"
            onClick={() => {
              handleAddProduct(product);
              setProduct("");
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Box className="container">
        {products.map((product, index) => (
          <Product key={index} name={product} />
        ))}
      </Box>
      {products.length === 0 && (
        <Typography variant="h5" component="h5" color="white">
          No Result Found
        </Typography>
      )}
    </Box>
  );
};

export default ProductList;
