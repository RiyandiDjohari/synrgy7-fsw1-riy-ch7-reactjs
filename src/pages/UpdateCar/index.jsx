import { Box, Button, Container, FormControl, Input, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { carOptions, carSpecs, typeCar } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [option, setOption] = useState("");
  const [availableAt, setAvailableAt] = useState(dayjs());
  const [spec, setSpec] = useState("");
  const [car, setCar] = useState(null);
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchCarById = async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/cars/${id}`);
      const data = await response.data.car;
      console.log(data);
      setCar(data);
      setAvailableAt(dayjs(data.availableAt));
      setImage(data.image);
    };
    fetchCarById();
  }, [id]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setFiles(file);

    reader.addEventListener("load", () => {
      setImage(reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOption = () => {
    car.options.push(option);
    alert("Option Added");
    setOption("");
  };

  const handleAddSpec = () => {
    car.specs.push(spec);
    alert("Specs Added");
    setSpec("");
  };

  const handleSubmit = async () => {
    alert(files);
    alert(image);

    console.log(files);
    console.log(car);

    const formData = new FormData();

    if (files) {
      formData.append("image", files);
    }

    for (const [key, value] of Object.entries(car)) {
      if (key === "options") {
        car.options.forEach((option) => {
          formData.append("options[]", option);
        });
      } else if (key === "specs") {
        car.specs.forEach((spec) => {
          formData.append("specs[]", spec);
        });
      } else {
        formData.append(key, value);
      }
    }

    const response = await axios.put(`http://localhost:8000/api/v1/cars/${id}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }
  );

    const data = await response.data;

    if (data.status === true) {
      alert("Update car success");
      navigate("/cars")
    } else {
      alert("Failed to update car");
    }
  };

  return (
    <Container>
      <div style ={{display: "flex", alignItems: "center", gap: "1rem"}}>
        <h2>Update Car</h2>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{height: "fit-content"}}>
          Back
        </Button>
      </div>
      <FormControl method="PUT" component="form">
        <TextField
          label="Plate"
          margin="dense"
          name="plate"
          value={car?.plate}
          onChange={handleInputChange}
          type="text"
          placeholder="DHL-3491"
        />

        <TextField
          label="Manufacture"
          margin="dense"
          name="manufacture"
          value={car?.manufacture}
          onChange={handleInputChange}
          type="text"
          placeholder="Ford"
        />

        <TextField
          label="Model"
          margin="dense"
          name="model"
          value={car?.model}
          onChange={handleInputChange}
          type="text"
          placeholder="ABC"
        />

        <TextField
          label="Rent Per Day"
          margin="dense"
          name="rentPerDay"
          value={car?.rentPerDay}
          onChange={handleInputChange}
          type="number"
          placeholder="100000"
        />

        <TextField
          label="Capacity"
          margin="dense"
          name="capacity"
          value={car?.capacity}
          onChange={handleInputChange}
          type="number"
          placeholder="4"
        />

        <TextField
          label="Description"
          margin="dense"
          name="description"
          value={car?.description}
          onChange={handleInputChange}
          type="text"
          placeholder="Lorem ipsum sit dolor amet"
          multiline
          rows={3}
        />

        <TextField
          label="Available"
          margin="dense"
          name="available"
          value={car?.available === true ? "true" : "false"}
          onChange={handleInputChange}
          select
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </TextField>

        <DatePicker
          label="Available At"
          id="availableAt"
          name="availableAt"
          sx={{ my: "0.5rem" }}
          format="DD/MM/YYYY"
          value={availableAt}
          onChange={(newValue) => {
            setAvailableAt(newValue);
            setCar((prev) => ({
              ...prev,
              availableAt: newValue.format("YYYY-MM-DD"),
            }));
          }}
        />

        <TextField
          label="Transmission"
          margin="dense"
          name="transmission"
          value={`${car?.transmission}`}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="Automatic">Automatic</MenuItem>
          <MenuItem value="Manual">Manual</MenuItem>
          <MenuItem value="Automanual">Automanual</MenuItem>
          <MenuItem value="CVT">CVT</MenuItem>
        </TextField>

        <TextField label="Type" margin="dense" name="type" value={`${car?.type}`} onChange={handleInputChange} select>
          {typeCar.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Year"
          margin="dense"
          name="year"
          value={car?.year}
          onChange={handleInputChange}
          type="number"
          placeholder="2024"
        />

        <TextField
          label="Options"
          margin="dense"
          name="type"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          select
        >
          {carOptions.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={() => handleAddOption()}>
          Select Option
        </Button>

        <TextField
          label="Specs"
          margin="dense"
          name="specs"
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
          select
        >
          {carSpecs.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={() => handleAddSpec()}>
          Select Spec
        </Button>

        <Box sx={{ my: "1rem" }}>
          <Input type="file" onChange={(e) => handleChange(e)} />
          <Button variant="contained" onClick={() => setImage(null)}>
            Clear image
          </Button>
          {image && <img src={image} alt="preview" width={200} />}
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </FormControl>
    </Container>
  );
};

export default UpdateCar;
