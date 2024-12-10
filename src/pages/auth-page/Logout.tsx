import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/spinner";

type Props = {};

function Logout({}: Props) {
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
