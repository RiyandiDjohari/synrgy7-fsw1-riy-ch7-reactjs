import { Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

const DetailCar = () => {
  const { car, fetchCar, deleteCar } = useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar(id);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      const data = await deleteCar(id);
      if (data.status === true) {
        alert(`Delete car with id ${id} successfully`);
        navigate("/cars");
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
          <p>Available At : {dayjs(car.availableAt).utc().format("YYYY-MM-DD")}</p>
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
