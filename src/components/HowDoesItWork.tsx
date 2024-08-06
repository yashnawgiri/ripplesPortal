import dashboardData from '@/data/landing.json';

export default function HowDoesItWork() {
    return (
        <div className="max-w-7xl flex flex-col border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345] p-10 mx-24">
            <div className="p-4 text-start">
                <h2 className="font-bold max-w-[46rem] text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">How does it work?</h2>
                <p className="max-w-md mt-6 mb-16 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet eu interdum.</p>
            </div>
            <div className="relative">
                <hr className="absolute mt-10 mx-36 left-0 w-9/12 h-0.5 bg-gray-600 transform -translate-y-1/2"/>
                <hr className="absolute mt-[19.5rem] mx-36 left-0 w-9/12 h-0.5 bg-gray-600 transform -translate-y-1/2"/>
                <div className="flex flex-wrap justify-between gap-8 px-6 pb-2 relative">
                    {dashboardData.HowDoesItWorkData.map(step => (
                        <div key={step.number} className="flex flex-col items-center text-center w-80 relative">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#292D43] mb-4">
                                <span className="text-4xl font-bold text-white">{step.number}</span>
                            </div>
                            <h3 className="text-2xl font-bold max-w-72 mb-2 text-white">{step.title}</h3>
                            <p className="text-base text-gray-400 max-w-64 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
