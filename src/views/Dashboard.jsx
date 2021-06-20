import React, { useContext } from 'react';
import { IconDeal, IconFeedback, IconForms, IconContacts, IconUser } from '../assets/icons/icons';
import { Container, Row, Col } from 'react-bootstrap';
import AppCard from '../components/card/card';
import Header from '../components/header/header';
import AppContext from '../context/appContext';

const appCards = [
	{
		icon: <IconDeal />,
		title: 'Deals',
		desc: 'Review and manage your leads and deals pipeline.',
		sectionPath: '/deals'
	},
	{
		icon: <IconFeedback />,
		title: 'Feedback',
		desc: 'Keep track of and aggregate feedback on listings.',
		sectionPath: '/feedback'
	},
	{
		icon: <IconForms />,
		title: 'Contacts',
		desc: 'Add contacts, edit client info and view relationship history',
		sectionPath: '/contacts'
	},
	{
		icon: <IconContacts />,
		title: 'Forms',
		desc: 'View status, download signed forms and send reminders.',
		sectionPath: '/forms'
	},
	//  {  icon:<IconQR />,
	//   title:'QR Codes',
	//   desc:'QR codes to forms when you are on the go.',
	//   sectionPath:"/code"
	//  },
	{
		icon: <IconUser />,
		title: 'Account',
		desc: 'Review and update your account information',
		sectionPath: '/account'
	}
];

const Dashboard = () => {
	const { user } = useContext(AppContext);
	const { agent } = useContext(AppContext);

	return (
		<Container fluid className="p-0">
			<Header />
			<Container>
				<Row>
					<Col md={12} className="dashboardCards pt-5">
						<h1>
							{user.attributes.given_name} {user.attributes.family_name}
						</h1>
						<div className="d-flex">
							<h6 className="pt-1">{agent.brokerageName}</h6>
							<h6 className="pt-1 pl-5">{agent.stateOfLicensure}</h6>
						</div>
					</Col>
				</Row>
				<Row>
					{appCards.map((item) => (
						<Col md={4}>
							<AppCard
								icon={item.icon}
								title={item.title}
								desc={item.desc}
								sectionPath={item.sectionPath}
							/>
						</Col>
					))}
				</Row>
			</Container>
		</Container>
	);
};

export default Dashboard;
