import React from "react";
import { Link } from "react-router-dom";

import privacyImage from "@/assets/images/data_privacy.png";

const DataPrivacyComponent: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full p-6 md:p-12">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          alt="data privacy"
          className="object-cover w-4/5 h-auto rounded-lg shadow-lg hue-rotate-[260deg]"
          src={privacyImage}
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-white p-4 md:p-8 rounded-lg text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Your data?</h2>
        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          Always <span className="text-green-400 underline">private</span>,
          fully secure.
        </h3>
        <p className="text-base md:text-lg mb-4">
          🔒 All the data on Ripples is hosted on Microsoft Azure Servers in
          India.
        </p>
        <p className="text-base md:text-lg mb-4">
          🔒 All of your data on Ripples is secured by TLS (SSL) 256-bit
          encryption.
        </p>
        <p className="text-base md:text-lg mb-6">
          🔒 All the Shopper and Store data stays private and is not shared
          between parties.
        </p>
        <Link
          className="inline-block px-8 py-3 bg-secondary text-white rounded-lg text-lg font-semibold hover:bg-secondary-dark transition duration-300"
          to="/get-demo"
        >
          Join Ripples Now
        </Link>
      </div>
    </div>
  );
};

export default DataPrivacyComponent;
