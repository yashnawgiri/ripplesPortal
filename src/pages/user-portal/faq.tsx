import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import data from "@/data/user-portal.json";
import UserDefaultLayout from "@/layouts/userDefault";
import { SearchBarIcon } from "@/components/icons";

const faqData = data.faqDataUserPortal;

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
        <button
          className="items-center mr-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaMinus className="w-4 sm:w-4 h-4 sm:h-4 text-white" />
          ) : (
            <FaPlus className="w-4 sm:w-4 h-4 sm:h-4 text-white" />
          )}
        </button>
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter((item) => {
    const searchContent = (item.question + " " + item.answer).toLowerCase();

    return searchContent.includes(searchTerm.toLowerCase());
  });

  return (
    <UserDefaultLayout>
      <div className="flex justify-end items-center p-4">
        <div className="relative">
          <input
            className="w-72 h-10 pl-10 pr-4 bg-primary text-white rounded-full border border-gray-700 focus:outline-none"
            placeholder="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchBarIcon />
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
          <div className="space-y-3">
            {filteredFAQs.map((item, index) => (
              <FAQItem
                key={index}
                answer={item.answer}
                question={item.question}
              />
            ))}
          </div>
          {filteredFAQs.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No matching FAQs found.
            </p>
          )}
        </div>
      </div>
    </UserDefaultLayout>
  );
}
