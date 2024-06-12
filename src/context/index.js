import axios from "axios";
import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // const [accounts, setAccounts] = useState([]);
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const [sampleValue, setSampleValue] = useState("Sample");

  const fetchCars = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/cars");
    const data = await response.data.cars;

    setCars(data);
  };

  const fetchCar = async (id) => {
    const response = await axios.get(`http://localhost:8000/api/v1/cars/${id}`);
    const data = await response.data.car;
    setCar(data);
  };

  const createCar = async (payload) => {
    const response = await axios.post("http://localhost:8000/api/v1/cars", payload, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });

    const data = await response.data;

    return data;
  };

  const updateCar = async (idCar, payload) => {
    const response = await axios.put(`http://localhost:8000/api/v1/cars/${idCar}`, payload, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    const data = await response.data;
    return data;
  };

  const deleteCar = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/cars/${id}`);
      const data = await response.data;
      fetchCars();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{ cars, setCars, car, setCar, fetchCars, fetchCar, createCar, updateCar,  deleteCar, sampleValue, setSampleValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
