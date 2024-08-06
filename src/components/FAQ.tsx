import React, { useState } from 'react';
import { title } from './primitives';
import { MinusIcon, PlusIcon } from './icons';
import dashboardData from '@/data/landing.json';

type FAQItemProps = {
    question: string;
    answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-fit p-4 w-4/6 mx-64 border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345]">
            <div className="flex justify-between">
                <h1 className="py-6 pl-10 text-3xl font-bold text-white">{question}</h1>
                {isOpen ? (
                    <div className="mt-8 mr-6" onClick={() => setIsOpen(!isOpen)}>
                        <PlusIcon />
                    </div>
                ) : (
                    <div className="mt-8 mr-6" onClick={() => setIsOpen(!isOpen)}>
                        <MinusIcon />
                    </div>
                )}
            </div>
            {isOpen && <p className="text-gray-400 pb-6 pl-10 pr-20">{answer}</p>}
        </div>
    );
};

export default function FAQ() {
    return (
        <div className="w-full">
            <div className="text-center mt-8">
                <h1 className={`${title({ size: 'lg', color: 'foreground', weight: 'bold' })} h-20`}>Frequently Ask Questions</h1>
                <p className="text-base max-w-xl py-4 text-gray-500 mx-auto">Torem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet amet eu interdum.</p>
            </div>
            <div className="w-full space-y-10 py-8">
                {dashboardData.faqData.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>

    );
}