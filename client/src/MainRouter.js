import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Profile from "./user/Profile";
import Register from "./user/Register";
import Login from "./auth/Login";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </>
  );
};

export default MainRouter;
