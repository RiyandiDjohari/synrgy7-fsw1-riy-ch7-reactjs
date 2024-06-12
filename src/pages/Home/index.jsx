import React, { useContext } from "react";
import { useState } from "react";
import ProductList from "../../components/ProductList";
import { products, menus } from "../../constant";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchMenu from "../../components/SearchMenu";
import Result from "../../components/Result";
import { googleLogout } from "@react-oauth/google";
import { AppContext } from "../../context";

const Homepage = () => {
  const { sampleValue } = useContext(AppContext);
  const [value, setValue] = useState("");
  const [listProducts, setListProducts] = useState(products);

  const navigate = useNavigate();

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleSearchProducts = (keyword) => {
    const filteredItems = products.filter((product) => product.toLowerCase().includes(keyword.toLowerCase()));

    setListProducts(filteredItems);
  };

  const handleAddProduct = (value) => {
    listProducts.push(value);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Container>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "2rem"}}>
        <SearchMenu value={value} handleInputChange={handleInputChange} />
        <Button variant="contained" onClick={handleLogout} sx={{height: "fit-content"}}>
          Logout
        </Button>
        <Typography>{sampleValue}</Typography>
      </Box>
      <Result value={value} menus={menus} />
      <ProductList
        handleSearchProducts={handleSearchProducts}
        products={listProducts}
        handleAddProduct={handleAddProduct}
      />
    </Container>
  );
};

export default Homepage;
