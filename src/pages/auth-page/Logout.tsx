import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Spinner } from "@/components/ui/Spinner";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/sign-in");
  }, [navigate]);

  return (
    <div>
      <Spinner />
    </div>
  );
}

export default Logout;
