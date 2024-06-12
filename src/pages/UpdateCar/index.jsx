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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { carOptions, carSpecs, typeCar } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context";
import { useFormik } from "formik";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const UpdateCar = () => {
  const { car, fetchCar, updateCar } = useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);

  useEffect(() => {
    fetchCar(id);
  }, [id]);

  const formik = useFormik({
    initialValues: {
      plate: car?.plate,
      manufacture: car?.manufacture,
      model: car?.model,
      rentPerDay: car?.rentPerDay,
      capacity: car?.capacity,
      description: car?.description,
      transmission: car?.transmission,
      available: car?.available,
      type: car?.type,
      year: car?.year,
      availableAt: car?.availableAt,
      options: car?.options,
      specs: car?.specs,
      image: car?.image,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formattedDate = dayjs(values.availableAt).format("YYYY-MM-DD");
      console.log({ ...values, availableAt: formattedDate });

      const formData = new FormData();
      for (const [key, value] of Object.entries({
        ...values,
        availableAt: formattedDate,
        image: files ? files : formik.values.image,
      })) {
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

      const data = await updateCar(id, formData);

      if (data.status === true) {
        alert("Update car success");
        navigate("/cars");
      } else {
        alert("Failed to update car");
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
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2>Update Car</h2>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ height: "fit-content" }}>
          Back
        </Button>
      </div>
      {formik.values ? (
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <TextField
              label="Plate"
              margin="dense"
              name="plate"
              value={formik.values.plate}
              onChange={formik.handleChange}
              type="text"
              placeholder="DHL-3491"
            />

            <TextField
              label="Manufacture"
              margin="dense"
              name="manufacture"
              value={formik.values.manufacture}
              onChange={formik.handleChange}
              type="text"
              placeholder="Ford"
            />

            <TextField
              label="Model"
              margin="dense"
              name="model"
              value={formik.values.model}
              onChange={formik.handleChange}
              type="text"
              placeholder="ABC"
            />

            <TextField
              label="Rent Per Day"
              margin="dense"
              name="rentPerDay"
              value={formik.values.rentPerDay}
              onChange={formik.handleChange}
              type="number"
              placeholder="100000"
            />

            <TextField
              label="Capacity"
              margin="dense"
              name="capacity"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              type="number"
              placeholder="4"
            />

            <TextField
              label="Description"
              margin="dense"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              type="text"
              placeholder="Lorem ipsum sit dolor amet"
              multiline
              rows={3}
            />

            <TextField
              label="Available"
              margin="dense"
              name="available"
              value={formik.values.available === true ? "true" : "false"}
              onChange={formik.handleChange}
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
              value={dayjs(formik.values.availableAt).utc()}
              onChange={(newValue) => formik.setFieldValue("availableAt", newValue)}
            />

            <TextField
              label="Transmission"
              margin="dense"
              name="transmission"
              value={`${formik.values.transmission}`}
              onChange={formik.handleChange}
              select
            >
              <MenuItem value="undefined" disabled>
                --Select Transmission--
              </MenuItem>
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
              <MenuItem value="Automanual">Automanual</MenuItem>
              <MenuItem value="CVT">CVT</MenuItem>
            </TextField>

            <TextField
              label="Type"
              margin="dense"
              name="type"
              value={`${formik.values.type}`}
              onChange={formik.handleChange}
              select
            >
              <MenuItem disabled value="undefined">
                --Select Type--
              </MenuItem>
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
              value={formik.values.year}
              onChange={formik.handleChange}
              type="number"
              placeholder="2024"
            />

            {formik.values.options ? (
              <FormControl margin="normal">
                <FormLabel component="legend">Car Options</FormLabel>
                <Grid container spacing={1}>
                  {carOptions.map((item, i) => (
                    <Grid item xs={2} key={i}>
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            value={item}
                            name="options"
                            checked={formik?.values?.options?.includes(item)}
                          />
                        }
                        label={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormControl>
            ) : (
              <p>Loading</p>
            )}

            {formik.values.specs ? (
              <FormControl margin="normal">
                <FormLabel component="legend">Car Specs</FormLabel>
                <Grid container spacing={1}>
                  {carSpecs.map((item, i) => (
                    <Grid item xs={3} key={i}>
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            onChange={formik.handleChange}
                            value={item}
                            name="specs"
                            checked={formik?.values?.specs?.includes(item)}
                          />
                        }
                        label={item}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormControl>
            ) : (
              <p>Loading</p>
            )}

            <Box sx={{ my: "1rem" }}>
              <Input type="file" onChange={(e) => handleImageChange(e)} />
              <Button variant="contained" onClick={() => formik.setFieldValue("image", null)}>
                Clear image
              </Button>
              {formik.values.image && <img src={formik.values.image} alt="preview" width={200} />}
            </Box>

            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </FormControl>
        </form>
      ) : (
        <p>Loading</p>
      )}
    </Container>
  );
};

export default UpdateCar;
