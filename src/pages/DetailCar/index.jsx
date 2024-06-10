import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarById = async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/cars/${id}`);
      const data = await response.data.car;
      console.log(data);
      setCar(data);
    };
    fetchCarById();
  }, [id]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      const response = await axios.delete(`http://localhost:8000/api/v1/cars/${id}`);
      const data = await response.data;
      console.log(data);
      if (data.status === true) {
        alert(`Delete car with id ${id} successfully`);
        navigate(-1);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <Container sx={{ mt: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <Typography variant="h5">Detail Car</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ height: "fit-content" }}>
          Back
        </Button>
      </div>
      {car ? (
        <div>
          <img src={car.image} width={450} height={225} alt="preview" style={{ borderRadius: "4px" }} />
          <p>Plate: {car.plate}</p>
          <p>Manufacture: {car.manufacture}</p>
          <p>Model: {car.model}</p>
          <p>Year: {car.year}</p>
          <p>Transmission : {car.transmission}</p>
          <p>Type : {car.type}</p>
          <p>Description : {car.description}</p>
          <p>Available At : {car.availableAt.slice(0, 10)}</p>
          <p>Capacity : {car.capacity}</p>
          <p>Rent per Day : {car.rentPerDay}</p>

          <p>Options</p>
          <ul>
            {car.options?.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
          <p>Specs</p>
          <ul>
            {car.specs?.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>
          <Button onClick={() => navigate(`/update-car/${id}`)} variant="contained" color="success">
            Update
          </Button>
          <Button sx={{ ml: "1rem" }} onClick={() => handleDelete(car.id)} variant="contained" color="warning">
            Delete
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default DetailCar;
