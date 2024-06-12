import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { carOptions, carSpecs, typeCar } from "../../constant";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  plate: yup
    .string("Enter plate")
    .min(4, "Plate should be of minimum 4 character length")
    .required("Plate is required"),
  manufacture: yup.string("Enter manufacture").min(2, "Too short").required("Manufacture is required"),
});

const CreateCar = () => {
  const { createCar } = useContext(AppContext);

  const navigate = useNavigate();

  const [files, setFiles] = useState(null);

  const formik = useFormik({
    initialValues: {
      plate: "",
      manufacture: "",
      model: "",
      rentPerDay: "",
      capacity: "",
      description: "",
      transmission: "",
      available: "",
      type: "",
      year: "",
      availableAt: dayjs(),
      options: [],
      specs: [],
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formattedDate = dayjs(values.availableAt).format("YYYY-MM-DD");
      console.log({ ...values, availableAt: formattedDate });

      const formData = new FormData();
      for (const [key, value] of Object.entries({ ...values, availableAt: formattedDate, image: files })) {
        if (key === "options") {
          values.options.forEach((option) => {
            formData.append("options[]", option);
          });
        } else if (key === "specs") {
          values.specs.forEach((spec) => {
            formData.append("specs[]", spec);
          });
        } else {
          formData.append(key, value);
        }
      }

      const data = await createCar(formData);

      if (data.status === true) {
        alert("Create car success");
        formik.resetForm();
      } else {
        alert("Failed to create car");
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        formik.setFieldValue("image", reader.result);
      });
      setFiles(file);
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
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <TextField
            label="Plate"
            margin="dense"
            name="plate"
            type="text"
            placeholder="DHL-3491"
            value={formik.values.plate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.plate && Boolean(formik.errors.plate)}
            helperText={formik.touched.plate && formik.errors.plate}
          />

          <TextField
            label="Manufacture"
            margin="dense"
            name="manufacture"
            type="text"
            placeholder="Ford"
            value={formik.values.manufacture}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.manufacture && Boolean(formik.errors.manufacture)}
            helperText={formik.touched.manufacture && formik.errors.manufacture}
          />

          <TextField
            label="Model"
            margin="dense"
            name="model"
            type="text"
            placeholder="ABC"
            value={formik.values.model}
            onChange={formik.handleChange}
          />

          <TextField
            label="Rent Per Day"
            margin="dense"
            name="rentPerDay"
            type="number"
            placeholder="100000"
            value={formik.values.rentPerDay}
            onChange={formik.handleChange}
          />

          <TextField
            label="Capacity"
            margin="dense"
            name="capacity"
            type="number"
            placeholder="4"
            value={formik.values.capacity}
            onChange={formik.handleChange}
          />

          <TextField
            label="Description"
            margin="dense"
            name="description"
            type="text"
            placeholder="Lorem ipsum sit dolor amet"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
          />

          <TextField
            label="Available"
            margin="dense"
            name="available"
            select
            value={formik.values.available}
            onChange={formik.handleChange}
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
            value={formik.values.availableAt}
            onChange={(newValue) => formik.setFieldValue("availableAt", newValue)}
          />

          <TextField
            label="Transmission"
            margin="dense"
            name="transmission"
            select
            value={formik.values.transmission}
            onChange={formik.handleChange}
          >
            <MenuItem value="Automatic">Automatic</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
            <MenuItem value="Automanual">Automanual</MenuItem>
            <MenuItem value="CVT">CVT</MenuItem>
          </TextField>

          <TextField
            label="Type"
            margin="dense"
            name="type"
            select
            value={formik.values.type}
            onChange={formik.handleChange}
          >
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
            type="number"
            placeholder="2024"
            value={formik.values.year}
            onChange={formik.handleChange}
          />

          <FormControl margin="normal">
            <FormLabel component="legend">Car Options</FormLabel>
            <Grid container spacing={1}>
              {carOptions.map((item, i) => (
                <Grid item xs={2} key={i}>
                  <FormControlLabel
                    key={i}
                    control={<Checkbox onChange={formik.handleChange} value={item} />}
                    label={item}
                    name="options"
                  />
                </Grid>
              ))}
            </Grid>
          </FormControl>

          <FormControl margin="normal">
            <FormLabel component="legend">Car Specs</FormLabel>
            <Grid container spacing={1}>
              {carSpecs.map((item, i) => (
                <Grid item xs={3} key={i}>
                  <FormControlLabel
                    key={i}
                    control={<Checkbox onChange={formik.handleChange} value={item} />}
                    label={item}
                    name="specs"
                  />
                </Grid>
              ))}
            </Grid>
          </FormControl>

          <Box sx={{ my: "1rem" }}>
            <Input type="file" onChange={(e) => handleImageChange(e)} />
            <Button variant="contained" onClick={() => formik.setFieldValue("image", "")}>
              Clear image
            </Button>
            {formik.values.image && <img src={formik.values.image} alt="preview" width={200} />}
          </Box>

          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

export default CreateCar;
