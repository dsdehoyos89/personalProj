import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Input from "./components/input/Input";
import PublicV from "./components/public/PublicV";
import Profile from "./components/profile/Profile";
import Splash from "./components/splash/Splash";
import SignUp from "./components/signUp/SignUp";

export default (
  <Switch>
    <Route path="/input" component={Input} />
    <Route path="/public" component={PublicV} />
    <Route path="/profile" component={Profile} />
    <Route path="/splash" component={Splash} />
    <Route path="/signup" component={SignUp} />
    <Route exact path="/" component={Landing} />
  </Switch>
);
