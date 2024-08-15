import React, { useState } from "react";

import { title } from "./primitives";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./../styles/faq.css";

import dashboardData from "@/data/landing.json";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="singleFAQ">
      <div className="flex justify-between items-baseline">
        <h1 className="faqTitle">
          {question}
        </h1>
        <div className="mt-5 md:mt-8 mr-6" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaMinus className="icon" />
          ):(
            <FaPlus className="icon" />
          )}
        </div>
      </div>
      {isOpen && (
        <p className="faqDescription">
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
          Frequently Asked Questions
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
