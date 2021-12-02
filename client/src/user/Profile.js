/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Paper, Typography } from "@material-ui/core";
import waldo from "./../assets/waldo.jpg";
import React, { useEffect, useState } from "react";
import auth from "./../auth/auth-helper";
import { Link } from "react-router-dom";
import { read } from "./api-user";

function Profile({ match }) {
  const [values, setValues] = useState({
    name: "",
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, name: data.name });
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  return (
    <Container style={{ marginTop: "10%" }}>
      <Typography align="center" variant="h2">
        {values.name} is logged in!
      </Typography>
      <br />
      <Typography align="center" variant="h5">
        Now,find Waldo below, and good luck!
      </Typography>

      <Paper elevation={5}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={waldo}
          alt={"Waldo"}
        />
      </Paper>
      <Button
        style={{ marginLeft: "45%", marginTop: "5%" }}
        component={Link}
        to={"/"}
        color="primary"
        onClick={() => {
          alert("You've been logged out");
          auth.clearJWT();
        }}
      >
        Logout
      </Button>
    </Container>
  );
}

export default Profile;
