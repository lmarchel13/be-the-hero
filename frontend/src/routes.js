import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Logon}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/incidents/new" component={NewIncident}></Route>
      </Switch>
    </BrowserRouter>
  );
};
