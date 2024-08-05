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
        <div className="max-w-4xl flex flex-col flex-wrap flex-shrink-0 border border-[#282D45] rounded-[10px] bg-[#0E1330] p-10 mx-24">
            <div className="text-start items-start">
                <h2 className={`${title({ size: 'sm', color: 'foreground', weight: 'extrabold' })}`}>How does it work?</h2>
                <p className="w-60 max-w-xl mt-4 mb-16 text-[10px] text-gray-500">Lorem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet eu interdum.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                {steps.map(step => (
                    <div key={step.number} className="flex flex-col items-center text-center w-60">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white-500 mb-4 bg-[#292D43]">
                            <span className="text-2xl font-bold text-white">{step.number}</span>
                        </div>
                        <h3 className="text-base font-semibold max-w-40 mb-2 text-white">{step.title}</h3>
                        <p className="text-[10px] text-gray-500 max-w-40">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};