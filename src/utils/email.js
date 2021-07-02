// PARAMS should be an object with the following properties
// {
// 	subject: 'hello',
// 	reply_to: 'faisalarshed28@gmail.com',
// 	to_email: 'faisalarshed28@gmail.com',
// 	html: '<h2>hey here!</h2>'
// }

export function sendEmail(params) {
	return fetch('https://dvjek9g5zd.execute-api.us-east-2.amazonaws.com/default/sendEmail', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': '73O7zhTvEf58KjViinNS98IViGQR8NzT16OTpdWr'
		},
		body: JSON.stringify(params)
	});
}
