import dashboardData from "@/data/landing.json";

export default function HowDoesItWork() {
  return (
    <div className="hidden sm:flex  max-w-7xl flex-col border border-[#282D45] md:rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345] p-10 mt-14">
      <div className="p-4 text-center">
        <h2 className="font-bold w-full text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          How does it work?
        </h2>
        <p className="w-full mt-6 mb-6 md:mb-16 text-base text-gray-400">
          Use our Shopify/Ecommerce Site plugin & Saas that gamifies user
          experience post purchase to ensure they become your brand advocates
        </p>
      </div>
      <div className="relative">
        {/* <hr className="absolute mt-10 mx-36 left-0 w-9/12 h-0.5 bg-gray-600 transform -translate-y-1/2"/>
                <hr className="absolute mt-[19.5rem] mx-36 left-0 w-9/12 h-0.5 bg-gray-600 transform -translate-y-1/2"/> */}
        <div className="flex flex-wrap md:justify-between justify-center gap-8 pb-2 relative">
          {dashboardData.HowDoesItWorkData.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center mx-auto text-center w-30p  md:w-50p relative"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#292D43] mb-4">
                <span className="text-4xl font-bold text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="text-2xl font-bold max-w-72 mb-2 text-white">
                {step.title}
              </h3>
              <p className="text-base text-gray-400 max-w-64 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
