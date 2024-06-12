import { Box, Button, Card, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";

const Cars = () => {
  const { cars, fetchCars } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);
  
  return (
    <Box sx={{ p: "2rem" }}>
      <h2>List Cars</h2>
      <Button variant="contained" sx={{ my: "1rem" }} onClick={() => navigate("/create-car")}>
        Create New Car
      </Button>
      <Grid container spacing={3} sx={{ mt: "1rem" }}>
        {cars?.map((car) => (
          <Grid item xs={3} key={car.id}>
            <Card sx={{ p: "1rem" }}>
              <img src={car.image} width="100%" height={200} style={{ borderRadius: "4px" }} alt="preview" />
              <p>Manufacture: {car.manufacture}</p>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
              <Button variant="contained" color="primary" onClick={() => navigate(`/cars/${car.id}`)}>
                More Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cars;
