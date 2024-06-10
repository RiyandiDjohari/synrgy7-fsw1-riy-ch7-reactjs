import { Box, Button } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import banner from "../../assets/banner_login.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:8000/api/v1/auth/login", { email, password });
      const data = await response.data;
      const token = data.token;

      if (data.status !== true) {
        alert("Username or password wromg");
      }

      alert("Login Success");
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = (res) => {
    console.log(res);
    axios
      .post(
        "http://localhost:8000/api/v1/auth/login/google",
        {
          token: res.credential,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFailure = (res) => {
    console.log(res);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        maxWidth: "800px",
        textAlign: "center",
      }}
    >
      <h4>Login page</h4>
      <form action="POST" style={{ width: "300px" }}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleSubmitLogin} sx={{ mb: "1rem" }}>
          login
        </Button>
        <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} />
      </form>
    </Box>
  );
};

export default Login;
