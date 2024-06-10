import React from "react";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import TodoList from "../../components/TodoList";
import { products, menus } from "../../constant";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchMenu from "../../components/SearchMenu";
import Result from "../../components/Result";
import { googleLogout } from "@react-oauth/google";

const Homepage = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState(null);
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

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
      </Box>
      <Result value={value} menus={menus} />
      <ProductList
        handleSearchProducts={handleSearchProducts}
        products={listProducts}
        handleAddProduct={handleAddProduct}
      />
      <TodoList todos={todos} />
    </Container>
  );
};

export default Homepage;
