import { Box, Button, Card, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState(null);
  const navigate = useNavigate();

  const fetchCars = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/cars");
    const data = await response.data.cars;

    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleViewDetailCar = (id) => {
    navigate(`/cars/${id}`);
  }

  const handleCreateNewCar = () => {
    navigate("/create-car")
  }
  return (
    <Box sx={{p: "2rem"}}>
      <h2>List Cars</h2>
      <Button variant="contained" sx={{my: "1rem"}} onClick={handleCreateNewCar}>Create New Car</Button>
      <Grid container spacing={3} sx={{mt: "1rem"}}>
        {cars?.map((car) => (
          <Grid item xs={3} key={car.id}>
            <Card sx={{p: "1rem"}}>
              <img src={car.image} width="100%" height={200} style={{borderRadius: "4px"}} alt="preview"/>
              <p>Manufacture: {car.manufacture}</p>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
              <Button variant="contained" color="primary" onClick={() => handleViewDetailCar(car.id)}>More Details</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cars;
