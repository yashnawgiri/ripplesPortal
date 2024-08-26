import { useState } from 'react';
import UserDefaultLayout from "@/layouts/userDefault";
import { SearchBarIcon } from '@/components/icons';
import { FaMinus, FaPlus } from 'react-icons/fa';

const faqData = [
    {
        "title": "Open ambassador program FAQs",
        "description": "This is a dummy description for Open ambassador program FAQs."
    },
    {
        "title": "How does the open ambassador program work?",
        "description": "This is a dummy description for How does the open ambassador program work?"
    },
    {
        "title": "How It Works?",
        "description": "This is a dummy description for How It Works."
    },
    {
        "title": "Can I earn rewards for purchases I make using my own Ripples link?",
        "description": "This is a dummy description for Can I earn rewards for purchases I make using my own Ripples link?"
    },
    {
        "title": "Can I share my Ripples link on social media?",
        "description": "This is a dummy description for Can I share my Ripples link on social media?"
    },
    {
        "title": "What happens if my friend returns their purchase?",
        "description": "This is a dummy description for What happens if my friend returns their purchase?"
    },
    {
        "title": "What kind of rewards can I earn with Ripples?",
        "description": "This is a dummy description for What kind of rewards can I earn with Ripples?"
    },
    {
        "title": "How long do I have to wait to receive my rewards after my friend makes a purchase?",
        "description": "This is a dummy description for How long do I have to wait to receive my rewards after my friend makes a purchase?"
    },
    {
        "title": "How can I get my rewards?",
        "description": "This is a dummy description for How can I get my rewards?"
    }
]


type FAQItemProps = {
    question: string;
    answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-fit mx-2 md:mx-0 md:p-4 py-3 px-1 border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345]">
            <div className="flex justify-between items-center">
                <h1 className="py- pl-10 text-xs md:text-lg font-poppins font-bold text-white">
                    {question}
                </h1>
                <div className="items-center mr-6" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <FaMinus className="w-4 sm:w-4 h-4 sm:h-4 text-white" />
                    ) : (
                        <FaPlus className="w-4 sm:w-4 h-4 sm:h-4 text-white" />
                    )}
                </div>
            </div>
            {isOpen && (
                <p className="text-gray-400 font-poppins text-xs md:text-base pt-1 pl-10 pr-16">
                    {answer}
                </p>
            )}
        </div>
    );
};


export default function FAQUserPortal() {
    return (
        <UserDefaultLayout>
            <div className="flex justify-end items-center p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-72 h-10 pl-10 pr-4 bg-primary text-white rounded-full border border-gray-700 focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchBarIcon/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-full sm:w-2/3 mb-4">
                    <div className="flex justify-center space-x-2 items-baseline mb-10">
                        <h2 className="text-lg lg:text-2xl font-extrabold font-poppins text-center leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                            For Ripplers
                        </h2>
                        <h3 className="text-sm lg:text-md italic font-semibold font-poppins text-center leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                            FAQs for Shoppers And Sharers
                        </h3>
                    </div>
                    <div className='space-y-3'>
                        {faqData.map((item, index) => (
                        <FAQItem key={index} answer={item.description} question={item.title} />
                        // <div key={index} className="my-6">
                        //     <h4
                        //         className="text-color font-poppins text-md md:text-lg cursor-pointer"
                        //         onClick={() => toggleDescription(index)}
                        //     >
                        //         {item.title}
                        //     </h4>
                        //     {visibleIndex === index && (
                        //         <p className="text-color text-xs font-poppins">
                        //             {item.description}
                        //         </p>
                        //     )}
                        // </div>
                    ))}
                    </div>
                    
                </div>
            </div>
        </UserDefaultLayout>
    );
}
