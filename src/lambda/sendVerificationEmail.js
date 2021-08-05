exports.handler = (event, context, callback) => {
	if (event.triggerSource === 'CustomMessage_SignUp') {
		const { codeParameter } = event.request;
		const { userName, region } = event;
		const { clientId } = event.callerContext;
		const { email } = event.request.userAttributes;
		const link = `https://app.cribfox.com/confirmSignup?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}`;
		event.response.emailSubject = 'Please verify your account with Cribfox';
		event.response.emailMessage = getRegisterEmailBody(link).replace(/\n/g, '');
	} else if (event.triggerSource === 'CustomMessage_ForgotPassword') {
		const { codeParameter } = event.request;
		const { userName, region } = event;
		const { clientId } = event.callerContext;
		const { email } = event.request.userAttributes;
		const link = `https://app.cribfox.com/reset-password?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}`;
		event.response.emailSubject = 'Reset your password';
		event.response.emailMessage = getForgotPasswordEmailBody(link).replace(/\n/g, '');
	}
	callback(null, event);
};

function getRegisterEmailBody(link) {
	return `<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
  <tr>
    <td>
      <div class="wrapper" style="max-width: 600px;margin: 20px auto;padding: 28px 42px 48px;background-color: #fff;box-shadow: 0px 4px 15px rgba(40, 43, 45, 0.05);">
        <table class="body-wrapper" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr align="center">
              <td class="logo">
              <span style="padding:40px 0 30px;margin: 0;font-size: 50px;font-weight: 300;line-height: 28px;"> <img src="https://cribfox.com/wp-content/uploads/2021/04/CRIBFOX-text-logo-300x124.png" /></span>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="padding:40px 0 30px;margin: 0;font-size: 18px;font-weight: 300;line-height: 25px;">Thank you for registering with Cribfox. In order to activate your account, please verify your email address by clicking on the button below</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <a href="${link}" style="width: 139px;height: 48px;margin: 20px auto 0;background: #002C59;color: #fff;font-size: 14px;font-weight: 500;display: flex;align-items: center;text-decoration: none;justify-content: center;border-radius:6px;">
                  <span style="display:block;line-height:48px; text-align:center;width: 139px;">Verify email</span>
                </a>
              </td>
            </tr>
            <tr>
              <td align="center">
                <div style="margin-top:40px;display: flex;justify-content:center;">
                <div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</tbody>
</table>`;
}

function getForgotPasswordEmailBody(link) {
	return `<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
  <tr>
    <td>
      <div class="wrapper" style="max-width: 600px;margin: 20px auto;padding: 28px 42px 48px;background-color: #fff;box-shadow: 0px 4px 15px rgba(40, 43, 45, 0.05);">
        <table class="body-wrapper" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr align="center">
              <td class="logo">
              <span style="padding:40px 0 30px;margin: 0;font-size: 50px;font-weight: 300;line-height: 28px;"> <img src="https://cribfox.com/wp-content/uploads/2021/04/CRIBFOX-text-logo-300x124.png" /></span>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="padding:40px 0 30px;margin: 0;font-size: 18px;font-weight: 300;line-height: 25px;">Click the link below to verify your email and reset your password</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <a href="${link}" style="width: 139px;height: 48px;margin: 20px auto 0;background: #002C59;color: #fff;font-size: 14px;font-weight: 500;display: flex;align-items: center;text-decoration: none;justify-content: center;border-radius:6px;">
                  <span style="display:block;line-height:48px; text-align:center;width: 139px;">Reset password</span>
                </a>
              </td>
            </tr>
            <tr>
              <td align="center">
                <div style="margin-top:40px;display: flex;justify-content:center;">
                <div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </td>
  </tr>
</tbody>
</table>`;
}
