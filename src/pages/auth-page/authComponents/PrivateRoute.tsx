import { siteConfig } from "@/config/site";
import { authTokenState } from "@/recoil/authTokenState";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

const PrivateRoute = () => {
    const [authToken, setAuthToken] = useRecoilState(authTokenState);
    const storedToken = localStorage.getItem('authToken');
    if (authToken !== storedToken) {
        setAuthToken(storedToken);
    }
    return authToken ? (
        <Outlet />
    ) : (
        <Navigate to={siteConfig.path.signIn} />
    );
};

export default PrivateRoute;