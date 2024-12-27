import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

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

  return storedToken ? <Outlet /> : <Navigate to={siteConfig.path.signIn} />;
};

export default PrivateRoute;
