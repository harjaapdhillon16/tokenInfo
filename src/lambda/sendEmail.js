const aws = require('aws-sdk');

const ses = new aws.SES({ region: 'us-east-2' });

exports.handler = async function (event) {
	const params = {
		Destination: {
			ToAddresses: [event.to_email]
		},
		Message: {
			Body: {
				Html: { Data: event.html }
			},

			Subject: { Data: event.subject }
		},
		Source: event.reply_to
	};

	const result = await ses.sendEmail(params).promise();
	return result;
};
