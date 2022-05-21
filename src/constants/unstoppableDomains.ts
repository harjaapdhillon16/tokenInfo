import UAuth from "@uauth/js";

// eslint-disable-next-line no-unused-vars
const developmentCredentials = {
  clientID: "qxRaA/ILJHo5WGXbo6NiWOI+FBModAIKVToTBGONEtI=",
  clientSecret: "MSk1Lx/iddaggFHSNoBNCfRn4vwblWkvmVivxFYpyww=",
  scope: "openid email wallet",
  redirectUri: "http://localhost:3000/callback",
  postLogoutRedirectUri: "http://localhost:3000/",
};
const productionCredentials = {
  clientID: "7e7f0d5b-8305-475d-8b3f-3621a42071b2",
  scope: "openid email wallet",
  redirectUri: "https://web3tokeninfo.netlify.app/callback",
  postLogoutRedirectUri: "https://web3tokeninfo.netlify.app/",
};

export const uauth = new UAuth(productionCredentials);
