import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { uauth } from "./constants/unstoppableDomains";

import { LandingPage } from "./pages/landing";
import Callback from "./pages/callback";

export const Router = () => {
  const [profile, setProfile] = useState<any>(null);

  const fetchUser = () => {
    uauth.user().then((data) => {
      if (data) {
        setProfile(data);
      } else {
        setProfile(false);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/callback">
            <Callback />
          </Route>

          <Route exact path="/loggedIn">
            <LandingPage />
          </Route>

          {profile ? <Redirect to="/" /> : <Redirect to="/" />}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
