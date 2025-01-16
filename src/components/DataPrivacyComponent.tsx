import React from "react";
import { Link } from "react-router-dom";

import privacyImage from "@/assets/images/data privacy.jpeg";
const DataPrivacyComponent: React.FC = () => {
  return (
    <div className="flex flex-1 justify-between  items-center w-svw bg-primary mt-8">
      <div className="">
        <img alt="data privacy" height={"100%"} src={privacyImage} />
      </div>
      <div className="bg-primary p-8 text-white rounded-lg max-w-md shadow-lg">
        <h2 className="text-left text-5xl font-bold mb-4">Your data?</h2>
        <h3 className="text-left text-xl font-semibold mb-6">
          Always <span className="text-green-400 underline">private</span>,
          fully secure.
        </h3>
        <p className="text-base mb-2">
          🔒 All the data on Ripples is hosted on Google Servers in the India.
        </p>
        <p className="text-base mb-2">
          🔒 All of your data on Ripples is secured by TLS (SSL) 256-bit
          encryption.
        </p>
        <p className="text-base mb-4">
          🔒 All the Shopper and Store data stays private and is not shared
          between parties.
        </p>
        <Link
          className="px-6 w-full bg-secondary text-white py-3 rounded-lg text-lg font-semibold hover:bg-secondary-dark"
          to={"/get-demo"}
        >
          Join Ripples Now
        </Link>
      </div>
    </div>
  );
};

export default DataPrivacyComponent;
