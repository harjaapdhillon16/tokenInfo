import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import useQuery from '../../hooks/useQuery';

export default function ConfirmSignUp(props) {
	const query = useQuery();
	const username = query.get('username');
	const code = query.get('code');
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (username && code) {
			Auth.confirmSignUp(username, code)
				.then(() => {
					toast.success('Account verified. You can now log in');
					setLoading(false);
				})
				.catch((e) => {
					toast.error(e.message);
					setLoading(false);
				});
		} else {
			toast.error('Invalid URL');
			setLoading(false);
		}
	}, []);

	if (isLoading) return <Loader />;

	return <Redirect to="/login" />;
}
