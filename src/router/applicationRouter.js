import React, { Suspense, lazy , useContext  } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "../components/Loader/Loader"
 
const Dashboard = lazy(() => import("../views/Dashboard"));
const FormsScreen = lazy(() => import("../views/formsScreen"));
const DealScreen = lazy(() => import ("../views/DealScreen"));
const Account = lazy(() =>import ("../views/Account"));
const Contact =lazy(() => import ("../views/Contact"));
const Form1 = lazy(() => import ("../forms/form1/Form1"));
const Form2 = lazy(() => import ("../forms/form2/Form2"));
const Form3 = lazy(() => import ("../forms/form3/Form3"));

 

const ApplicationRouter = () => {
    
   
  
  return (
    <React.Fragment>
      <Switch>
        <Suspense fallback={<div className="appRouterLoader"><Loader /></div>}>
        <Route exact path="/Form3" component={Form3} />
        <Route exact path="/Form2" component={Form2} />
        <Route exact path="/Form1" component={Form1} />
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
