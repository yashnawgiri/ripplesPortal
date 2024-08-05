import { title } from "./primitives";

const steps = [
    {
        number: 1,
        title: 'Setup reward programs',
        description: 'With lots of unique blocks, you can easily build a page easily without any coding.',
    },
    {
        number: 2,
        title: 'Shopper receives CTA at POS',
        description: 'With lots of unique blocks, you can easily build a page easily without any coding.',
    },
    {
        number: 3,
        title: 'Shopper shares amongst followers',
        description: 'With lots of unique blocks, you can easily build a page easily without any coding.',
    },
    {
        number: 4,
        title: 'Identify micro influencers amongst shoppers',
        description: 'With lots of unique blocks, you can easily build a page easily without any coding.',
    },
    {
        number: 5,
        title: 'Brands give out influencer style rewards - cash in the ripple wallet',
        description: 'With lots of unique blocks, you can easily build a page easily without any coding.',
    },
    {
        number: 6,
        title: 'Streamlined tracking sales & traffic',
        description: 'With lots of unique blocks, you can easily build a page easily without any coding.',
    },
];

export default function HowDoesItWork() {
    return (
        <div className="max-w-7xl flex flex-col flex-wrap flex-shrink-0 border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345] p-10 mx-24">
            <div className="p-4 text-start items-start">
                <h2 className="font-bold max-w-[46rem] text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">How does it work?</h2>
                <p className=" max-w-md mt-6 mb-16 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet eu interdum.</p>
            </div>
            <div className="flex flex-wrap justify-between gap-8 px-6 pb-2">
                {steps.map(step => (
                    <div key={step.number} className="flex flex-col items-center text-center w-80">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white-500 mb-4 bg-[#292D43]">
                            <span className="text-4xl font-bold text-white">{step.number}</span>
                        </div>
                        <h3 className="text-2xl font-bold max-w-72 mb-2 text-white">{step.title}</h3>
                        <p className="text-base text-gray-500 max-w-72">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};