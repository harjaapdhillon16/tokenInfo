import axios from 'axios';

export function sendEmail(params) {
	// return axios.post(
	// 	'https://dvjek9g5zd.execute-api.us-east-2.amazonaws.com/default/sendEmail',
	// 	params,
	// 	{
	// 		headers: { 'x-api-key': '73O7zhTvEf58KjViinNS98IViGQR8NzT16OTpdWr' }
	// 	}
	// );
	return fetch('https://dvjek9g5zd.execute-api.us-east-2.amazonaws.com/default/sendEmail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': '73O7zhTvEf58KjViinNS98IViGQR8NzT16OTpdWr'
		},
		body: JSON.stringify(params)
	});
}

sendEmail({
	subject: 'hello',
	reply_to: 'faisalarshed28@gmail.com',
	to_email: 'faisalarshed28@gmail.com',
	html: '<h2>hey here!</h2>'
})
	.then((e) => console.log(e))
	.catch((e) => console.log(e));
