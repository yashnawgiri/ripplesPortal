import type { FC } from "react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import "./../styles/home/faq.css";

import dashboardData from "@/data/landing.json";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="singleFAQ">
      <div className="flex justify-between items-baseline">
        <h1 className="faqTitle">{question}</h1>
        <button
          className="mt-5 md:mt-8 mr-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaMinus className="icon" /> : <FaPlus className="icon" />}
        </button>
      </div>
      {isOpen && (
        <div
          dangerouslySetInnerHTML={{ __html: answer }}
          className="faqDescription"
        />
      )}
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="max-w-7xl w-full space-y-8">
      <div className="text-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 py-4 text-center text-3xl md:text-5xl font-bold">
          {dashboardData.ComponentsData.FAQ.title}
        </h1>
        {/* <p className="text-base max-w-xl py-4 text-color mx-auto">{dashboardData.ComponentsData.FAQ.description}</p> */}
      </div>
      <div className="w-full space-y-3 md:space-y-10 content-center">
        {dashboardData.faqData.map((faq, index) => (
          <FAQItem key={index} answer={faq.answer} question={faq.question} />
        ))}
      </div>
    </div>
  );
}
