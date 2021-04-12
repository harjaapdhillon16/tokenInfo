import React, { Suspense, lazy , useContext  } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import Header from "../components/header/header";
import Loader from "../components/Loader/Loader"
 
const Dashboard = lazy(() => import("../views/Dashboard"));
const FormsScreen = lazy(() => import("../views/formsScreen"));
const DealScreen = lazy(() => import ("../views/DealScreen"));
const Account = lazy(() =>import ("../views/Account"));
const Contact =lazy(() => import ("../views/Contact"));
const FeedbackScreen =lazy(() => import ("../views/FeedbackScreen"));
 

const ApplicationRouter = () => {

  return (
    <React.Fragment>
      {/* <Header /> */}
      <Switch>
        <Suspense fallback={<div className="appRouterLoader"><Loader /></div>}>
        <Route exact path="/feedback" component={FeedbackScreen} />
        <Route exact path="/contacts" component={Contact} />
        <Route exact path="/deals" component={DealScreen} />
        <Route exact path="/forms" component={FormsScreen} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/" component={Dashboard} />
        </Suspense>

        <Redirect to="not-found" />
      </Switch>
    </React.Fragment>
  );
};

export default ApplicationRouter;
