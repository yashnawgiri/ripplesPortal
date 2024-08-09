import React, { useState } from "react";

import { title } from "./primitives";
import { MinusIcon, PlusIcon } from "./icons";
import { FaPlus,FaMinus} from "react-icons/fa";

import dashboardData from "@/data/landing.json";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-fit mx-2 md:mx-0 md:p-4 px-1 border border-[#282D45] rounded-xl bg-gradient-to-br from-[#0e194e] to-[#0c3345]">
      <div className="flex justify-between items-baseline">
        <h1 className="py-4 pl-10 text-xs md:text-3xl font-bold text-white">
          {question}
        </h1>
        {isOpen ? (
          <div className="mt-5 md:mt-8 mr-6 " onClick={() => setIsOpen(!isOpen)}>
            <FaMinus className="w-4 sm:w-6 h-4 sm:h-6 text-white"/>
          </div>
        ) : (
          <div className="mt-5 md:mt-8 mr-6 " onClick={() => setIsOpen(!isOpen)}>
            <FaPlus className="w-4 sm:w-6  h-4 sm:h-6 text-white"/>
          </div>
        )}
      </div>
      {isOpen && (
        <p className="text-gray-400 text-xs md:text-base pb-4 pt- md:pb-6 pl-10 pr-16">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="max-w-7xl w-full space-y-8">
      <div className="text-center">
        <h1
          className={`${title({ size: "lg", color: "foreground", weight: "bold" })} h-20`}
        >
          Frequently Ask Questions
        </h1>
        {/* <p className="text-base max-w-xl py-4 text-gray-400 mx-auto">Torem ipsum dolor sit amet consectetur. Nulla quisque scelerisque eget quis. Eu amet amet eu interdum.</p> */}
      </div>
      <div className="w-full space-y-3 md:space-y-10 content-center">
        {dashboardData.faqData.map((faq, index) => (
          <FAQItem key={index} answer={faq.answer} question={faq.question} />
        ))}
      </div>
    </div>
  );
}
