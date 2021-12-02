import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";

function Home() {
  return (
    <Container style={{ marginTop: "10%" }}>
      <Card
        align="center"
        style={{ height: "50%", backgroundColor: "#F5E3D2" }}
      >
        <CardContent>
          <Typography align="center" variant="h2">
            Base login application
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button component={Link} to={"/register"} color="primary">
            Register
          </Button>
          <Button component={Link} to={"/login"} color="secondary">
            Log in
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Home;
