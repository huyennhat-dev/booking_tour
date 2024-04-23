import React, { useState } from "react";
import { FAQs } from "../../constants/FAQ";
import { styles } from "../../styles/styles";

// FAQ item component
const FAQItem = ({ Q, A }) => {
  return (
    <div className="faq-item">
      <div className="faq-question">{Q}</div>
      <div className="faq-answer">{A}</div>
    </div>
  );
};

// Accordion component
const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full flex flex-col items-start gap-y-6">
      <h5 className="font-bold text-2xl">FAQ</h5>
      <div className="w-full flex flex-col items-start gap-y-6">
        {FAQs.map((faq, index) => (
          <div
            key={index}
            className={`w-full rounded-lg flex flex-col gap-y-3 p-3 border ${
              activeIndex == index ? "shadow-lg" : ""
            }`}
          >
            <div
              className={`flex justify-between items-center ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <h6 className="text-base font-medium">{faq.Q}</h6>
              <button
                className={`w-6 h-6 rounded-full ${
                  activeIndex === index ? "bg-orange-400" : styles.bgOrange
                }`}
                onClick={() => toggleAccordion(index)}
              ></button>
            </div>
            {activeIndex === index && (
              <div className="">
                {/* <FAQItem question={faq.Q} answer={faq.A} /> */}
                <p className="text-sm font-normal">{faq?.A}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
