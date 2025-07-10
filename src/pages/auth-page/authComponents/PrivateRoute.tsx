import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import { authTokenState } from "@/recoil/authTokenState";
import { userIdState } from "@/recoil/userIdState";

const PrivateRoute = () => {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [userId, setUserId] = useRecoilState(userIdState);

  const storedToken = localStorage.getItem("authToken");
  const storedUserId = localStorage.getItem("userId");

  // Update Recoil state only if the stored values are different
  if (authToken !== storedToken) {
    setAuthToken(storedToken || "");
  }
  if (userId !== storedUserId) {
    setUserId(storedUserId || "");
  }

  useEffect(() => {
    // Load the Zendesk script dynamically
    if (!document.getElementById("ze-snippet")) {
      const script = document.createElement("script");

      script.id = "ze-snippet";
      script.src =
        "https://static.zdassets.com/ekr/snippet.js?key=ff935203-968c-4bb2-ba8c-325d7e5e644e";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      // Clean up the script when the component is unmounted
      const zendeskScript = document.getElementById("ze-snippet");

      if (zendeskScript) {
        zendeskScript.remove();
      }
    };
  }, []);

  return storedToken ? <Outlet /> : <Navigate to={siteConfig.path.signIn} />;
};

export default PrivateRoute;
