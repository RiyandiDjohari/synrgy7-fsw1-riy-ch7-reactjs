import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home";
import About from "./pages/About";
import Cars from "./pages/Cars";
import DetailCar from "./pages/DetailCar";
import CreateCar from "./pages/CreateCar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import UpdateCar from "./pages/UpdateCar";
import AppProvider from "./context";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/cars/:id" element={<DetailCar />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/create-car" element={<CreateCar />} />
                <Route path="/update-car/:id" element={<UpdateCar />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
