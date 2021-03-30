import React, { Suspense, lazy , useContext  } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "../components/Loader/Loader"
 
const Dashboard = lazy(() => import("../views/Dashboard"));
const FormsScreen = lazy(() => import("../views/formsScreen"));

 

const ApplicationRouter = () => {
    
   
  
  return (
    <React.Fragment>
      <Switch>
        <Suspense fallback={<div className="appRouterLoader"><Loader /></div>}>

          
        <Route exact path="/forms" component={FormsScreen} />
        <Route exact path="/" component={Dashboard} />
        </Suspense>

        <Redirect to="not-found" />
      </Switch>
    </React.Fragment>
  );
};

export default ApplicationRouter;
