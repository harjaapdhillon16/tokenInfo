import React, { Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
// import Header from "../components/header/header";
import Loader from '../components/Loader/Loader';
import PrivateRoute from '../wrappers/PrivateRoute';

const Dashboard = lazy(() => import('../views/Dashboard'));
const FormsScreen = lazy(() => import('../views/formsScreen'));
const DealScreen = lazy(() => import('../views/DealScreen'));
const Account = lazy(() => import('../views/Account'));
const Contact = lazy(() => import('../views/Contact'));
const FeedbackScreen = lazy(() => import('../views/FeedbackScreen'));
const ContactDetail = lazy(() => import('../views/ContactDetail'));

const ApplicationRouter = () => {
	return (
		<React.Fragment>
			{/* <Header /> */}
			<Switch>
				<Suspense
					fallback={
						<div className="appRouterLoader">
							<Loader />
						</div>
					}>
					<PrivateRoute path="/ContactDetail/:id">
						<ContactDetail />
					</PrivateRoute>
					<PrivateRoute exact path="/feedback">
						<FeedbackScreen />
					</PrivateRoute>
					<PrivateRoute exact path="/contacts">
						<Contact />
					</PrivateRoute>
					<PrivateRoute exact path="/deals">
						<DealScreen />
					</PrivateRoute>
					<PrivateRoute exact path="/forms">
						<FormsScreen />
					</PrivateRoute>
					<PrivateRoute exact path="/account">
						<Account />
					</PrivateRoute>
					<PrivateRoute exact path="/">
						<Dashboard />
					</PrivateRoute>
				</Suspense>

				<Redirect to="not-found" />
			</Switch>
		</React.Fragment>
	);
};

export default ApplicationRouter;
