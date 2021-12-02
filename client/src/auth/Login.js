import React, { useState } from "react";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { signin } from "./api-auth";
import {
  Container,
  Icon,
  Typography,
  TextField,
  Button,
  CardContent,
  CardActions,
  Card,
} from "@material-ui/core";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={"/user/" + auth.isAuthenticated().user._id} />;
  }
  return (
    <Container maxWidth="sm" style={{ marginTop: "25%" }}>
      <Card align="center" style={{ backgroundColor: "#F5E3D2" }}>
        <CardContent>
          <Typography align="center" variant="h6">
            Sign In
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />

          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error">Error</Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            style={{ marginLeft: "43%" }}
            color="primary"
            variant="contained"
            onClick={clickSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Login;
