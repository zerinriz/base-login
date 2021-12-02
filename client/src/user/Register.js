import React, { useState } from "react";
import $ from "jquery";
import {
  Container,
  Icon,
  Typography,
  TextField,
  Button,
  CardContent,
  CardActions,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { create } from "./api-user.js";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });

  $("#password, #confirm_password").on("keyup", function () {
    if ($("#password").val() === $("#confirm_password").val()) {
      $("#message").html("Matching").css("color", "green");
    } else $("#message").html("Not Matching").css("color", "red");
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        const matching = document.getElementById("message").innerHTML;
        console.log(matching);
        if (matching === "Matching") {
          setValues({ ...values, error: "", open: true });
        }
      }
    });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "25%" }}>
      <Card align="center" style={{ backgroundColor: "#F5E3D2" }}>
        <CardContent>
          <Typography variant="h6">Sign Up</Typography>
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
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
          <TextField
            id="confirm_password"
            type="password"
            label="Confirm Password"
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
        <span
          style={{
            position: "absolute",
            left: " 50%",
            transform: "translateX(-50%)",
            marginTop: "-20px",
          }}
          id="message"
        ></span>
        <CardActions>
          <Button
            style={{ marginLeft: "42%" }}
            color="primary"
            variant="contained"
            onClick={clickSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/login">
            <Button color="primary" autoFocus="autoFocus">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Register;
