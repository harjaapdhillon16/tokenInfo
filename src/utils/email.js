export function sendEmail(params) {
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
