import { useEffect } from "react";
import { uauth } from "../constants/unstoppableDomains";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-undef
const CallBack = (): JSX.Element => {
  const { push } = useHistory();
  useEffect(() => {
    uauth.loginCallback().then((res) => {
      push("/loggedIn");
      window.location.reload();
    });
  }, [push]);

  return <div>Loading...</div>;
};

export default CallBack;
