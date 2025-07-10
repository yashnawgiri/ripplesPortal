import { useNavigate } from "react-router-dom";

// import notFoundSvg from "@/assets/images/not-found.svg";
import { imageUrls } from "@/utils/imageUrl";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        alt="Not Found"
        className="my-"
        height="300px"
        src={imageUrls.notFound}
        width="500px"
      />
      <div className="space-y-2 text-center mb-6">
        <h1 className="text-3xl font-poppins font-bold">
          404 - PAGE NOT FOUND
        </h1>
        <p className="text-lg text-gray-500">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>

      <button
        className="bg-secondary font-poppins text-white py-4 px-8 rounded-full border border-gray-500"
        onClick={() => navigate("/")}
      >
        GO TO HOMEPAGE
      </button>
    </div>
  );
}
