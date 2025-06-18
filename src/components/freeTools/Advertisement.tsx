import { Link } from "react-router-dom";

import { siteConfig } from "@/config/site";

type Props = {};

function Advertisement({}: Props) {
  return (
    <div className="bg-primary py-16 relative z-0">
      <div className="container mx-auto px-4">
        <div className="bg-ripples-dark rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="flex flex-col-reverse md:flex-row items-center justify-center">
            <div className="md:w-2/3 mb-8 md:mb-0 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
                Turn customers into Advocates
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-xl text-center md:text-left">
                Ripples is an OS that helps you automate and scale
                influencer-style rewards for your customers, unlocking virality.
              </p>
              <div className="flex flex-wrap gap-8 mb-6 justify-center md:justify-start">
                <div>
                  <div className="text-4xl font-bold">10%</div>
                  <div className="text-sm opacity-80">Increase in Sales</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">5X</div>
                  <div className="text-sm opacity-80">Your Referrals</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">65%</div>
                  <div className="text-sm opacity-80">Reduction in CAC</div>
                </div>
              </div>
              <Link
                className="inline-block w-full md:w-10/12 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-lg transition-all duration-300  justify-center items-center md:justify-start text-center"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                target="_blank"
                to={siteConfig.path.getDemo}
              >
                Start 14 Days free trial
              </Link>
            </div>
            <div className="md:w-1/3 relative z-10">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center">
                  <svg
                    className="text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    alt="Ripples App Screenshot"
                    className="w-full h-auto rounded"
                    src="https://ripples1static.blob.core.windows.net/images/customers into advocates.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mb-20 z-0" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/10 rounded-full -ml-20 -mt-20 z-0" />
        </div>
      </div>
    </div>
  );
}

export default Advertisement;
