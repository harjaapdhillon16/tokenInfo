const aws = require('aws-sdk');

const ses = new aws.SES({ region: 'us-east-2' });

exports.handler = async function (event) {
	const args = JSON.parse(event.body);

	const params = {
		Destination: {
			ToAddresses: [args.to_email]
		},
		Message: {
			Body: {
				Html: { Data: args.html }
			},

			Subject: { Data: args.subject }
		},
		Source: args.reply_to
	};

	const result = await ses.sendEmail(params).promise();
	return result;
};
