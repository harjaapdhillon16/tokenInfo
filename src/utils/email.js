export function sendEmail(params) {
	if (Array.isArray(params.to_email)) {
	//	params.to_email.forEach((item) => handleEmail({ ...params, to_email: item }));
	} else {
	//	handleEmail(params);
	}
}

function handleEmail(params) {
	params.reply_to = 'team@cribfox.com';
	return fetch('https://dvjek9g5zd.execute-api.us-east-2.amazonaws.com/default/sendEmail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': '73O7zhTvEf58KjViinNS98IViGQR8NzT16OTpdWr'
		},
		body: JSON.stringify(params)
	});
}
