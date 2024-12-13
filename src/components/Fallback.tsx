import { Spinner } from "@nextui-org/react";

export default function Fallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-white">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <Spinner color="white" size="lg" />

        {/* Loading Message */}
        <h1 className="text-2xl font-semibold text-gray-700">
          Loading, please wait...
        </h1>

        {/* Subtext */}
        <p className="text-gray-500">
          We’re getting everything ready for you. This will just take a moment.
        </p>
      </div>
    </div>
  );
}
