import React from 'react';
import { Link } from 'react-router-dom';

const DataPrivacyComponent: React.FC = () => {
  return (
    <div className="flex justify-end items-end w-svw bg-primary p-4 px-12">
      <div className="bg-primary p-8 text-white rounded-lg max-w-md shadow-lg">
        <h2 className="text-left text-5xl font-bold mb-4">Your data?</h2>
        <h3 className="text-left text-xl font-semibold mb-6">
          Always <span className="text-red-500 underline">private</span>, fully secure.
        </h3>
        <p className="text-base mb-2">🔒 All the data on Throne is hosted on Google Servers in the US.</p>
        <p className="text-base mb-2">🔒 All of your data on Throne is secured by TLS (SSL) 256-bit encryption.</p>
        <p className="text-base mb-4">🔒 All the creator & fan information stays private and is not shared between parties.</p>
        <Link to={'/get-demo'} className="px-6 w-full bg-secondary text-white py-3 rounded-lg text-lg font-semibold hover:bg-secondary-dark">
          Join Ripples Now
        </Link>
      </div>
    </div>
  );
};

export default DataPrivacyComponent;
