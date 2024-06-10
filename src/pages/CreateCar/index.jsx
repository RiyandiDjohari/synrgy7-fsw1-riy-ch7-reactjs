import { Box, Button, Container, FormControl, Input, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { carOptions, carSpecs, typeCar } from "../../constant";
import { useNavigate } from "react-router-dom";

const CreateCar = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState("");
  const [availableAt, setAvailableAt] = useState(dayjs());
  const [spec, setSpec] = useState("");
  const [carData, setCarData] = useState({
    plate: "",
    manufacture: "",
    model: "",
    rentPerDay: "",
    capacity: "",
    description: "",
    transmission: "",
    available: "",
    availableAt: dayjs().format("YYYY-MM-DD"),
    type: "",
    year: "",
    options: [],
    specs: [],
  });
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState(null);

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
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOption = () => {
    carData.options.push(option);
    alert("Option Added");
    setOption("");
  };

  const handleAddSpec = () => {
    carData.specs.push(spec);
    alert("Specs Added");
    setSpec("");
  };

  const handleSubmit = async () => {
    alert(files);
    alert(image);

    console.log(files);
    console.log(carData);

    const formData = new FormData();

    formData.append("image", files);

    for (const [key, value] of Object.entries(carData)) {
      if (key === "options") {
        carData.options.forEach((option) => {
          formData.append("options[]", option);
        });
      } else if (key === "specs") {
        carData.specs.forEach((spec) => {
          formData.append("specs[]", spec);
        });
      } else {
        formData.append(key, value);
      }
    }

    const response = await axios.post("http://localhost:8000/api/v1/cars", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    const data = await response.data;

    if (data.status === true) {
      alert("Create car success");
    } else {
      alert("Failed to create car");
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1rem 0" }}>
        <Typography variant="h5">Create Car</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ height: "fit-content" }}>
          Back
        </Button>
      </div>
      <FormControl method="POST" component="form">
        <TextField
          label="Plate"
          margin="dense"
          name="plate"
          value={carData.plate}
          onChange={handleInputChange}
          type="text"
          placeholder="DHL-3491"
        />

        <TextField
          label="Manufacture"
          margin="dense"
          name="manufacture"
          value={carData.manufacture}
          onChange={handleInputChange}
          type="text"
          placeholder="Ford"
        />

        <TextField
          label="Model"
          margin="dense"
          name="model"
          value={carData.model}
          onChange={handleInputChange}
          type="text"
          placeholder="ABC"
        />

        <TextField
          label="Rent Per Day"
          margin="dense"
          name="rentPerDay"
          value={carData.rentPerDay}
          onChange={handleInputChange}
          type="number"
          placeholder="100000"
        />

        <TextField
          label="Capacity"
          margin="dense"
          name="capacity"
          value={carData.capacity}
          onChange={handleInputChange}
          type="number"
          placeholder="4"
        />

        <TextField
          label="Description"
          margin="dense"
          name="description"
          value={carData.description}
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
          value={carData.available}
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
            setCarData((prev) => ({
              ...prev,
              availableAt: newValue.format("YYYY-MM-DD"),
            }));
          }}
        />

        <TextField
          label="Transmission"
          margin="dense"
          name="transmission"
          value={carData.transmission}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="Automatic">Automatic</MenuItem>
          <MenuItem value="Manual">Manual</MenuItem>
          <MenuItem value="Automanual">Automanual</MenuItem>
          <MenuItem value="CVT">CVT</MenuItem>
        </TextField>

        <TextField label="Type" margin="dense" name="type" value={carData.type} onChange={handleInputChange} select>
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
          value={carData.year}
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
          Create
        </Button>
      </FormControl>
    </Container>
  );
};

export default CreateCar;
