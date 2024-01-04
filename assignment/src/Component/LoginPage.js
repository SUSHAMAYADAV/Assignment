import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoginPage() {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });
  const onChangeUserHandlers = (e) => {
    setuserName(e.target.value);
    if (userName) {
      setErrorUser("");
    }
  };
  const onChangePasswordHandlers = (e) => {
    setPassword(e.target.value);
    if (password) {
      setErrorPassword("");
    }
  };
  const loginDetails = async () => {
    if (!userName) {
      setErrorUser("Please enter user name");
    }
    if (!password) {
      setErrorPassword("Please enter password");
    }
    
    if (userName && password) {
      const payload = {
        username: userName,
        password: password,
      };
      const res = await axios.post("https://dummyjson.com/auth/login", payload);
      console.log("res------>", res);
      if (res.status === 200) {
        console.log("----Token-->", res.data.token)
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 450,
          mt: 20,
          boxShadow: 3,
          p: 5,
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => onChangeUserHandlers(e)}
              type="text"
              fullWidth
              id="outlined-basic"
              label="User Name"
              variant="outlined"
            />
            <span style={{ color: "red" }}>{errorUser}</span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => onChangePasswordHandlers(e)}
              fullWidth
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            <span style={{ color: "red" }}>{errorPassword}</span>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={loginDetails} fullWidth variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default LoginPage;
