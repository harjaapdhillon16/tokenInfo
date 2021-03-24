import React, { Suspense, lazy , useContext  } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Loader from "../components/Loader/Loader";
import HotelContext from "../context/hotelContext";

const Dashboard = lazy(() => import("../views/Dashboard/dashboard"));
const AboutTheHotel = lazy(() => import("../views/aboutTheHotel/aboutTheHotel"));
const PersonalInfo = lazy(() => import("../views/personalInfo/personalInfo"));
const InviteGuests = lazy(() => import("../views/inviteGuests/inviteGuests"));
const EditServices = lazy(() => import("../views/editServices/editServices"));
const NotificationsScreen = lazy(() => import("../views/notificationsScreen/notificationsScreen"));
const WhiteLabel = lazy(() => import("../views/whiteLabel/whiteLabel"));
const RequestQueries = lazy(() => import("../views/requestQueries/requestQueries"));
const ServicesWrapper =  lazy(() =>  import("../wrappers/servicesWrapper"));
const Automation =  lazy(() =>  import("../views/automation/automation"));

 

const ApplicationRouter = () => {
    
  const { hotel} = useContext(HotelContext);
  
  return (
    <React.Fragment>
      <Switch>
        <Suspense fallback={<div className="appRouterLoader"><Loader /></div>}>

          <Route path="/invite-guests" component={InviteGuests} />
          <Route path="/personal-info" component={PersonalInfo} />
          <Route path="/about-the-hotel" component={AboutTheHotel} />
          <Route path="/edit-services" component={ServicesWrapper} />
          <Route path="/notifications" component={NotificationsScreen} />
          <Route path="/white-label" component={WhiteLabel} />
          <Route path="/request-queries" component={RequestQueries} />
          <Route path="/automation" component={Automation} />
          
          <Route exact path="/" component={Dashboard} />
        </Suspense>

        <Redirect to="not-found" />
      </Switch>
    </React.Fragment>
  );
};

export default ApplicationRouter;
