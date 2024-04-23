import React from "react";
import { styles } from "../../styles/styles";
import { GoDotFill } from "react-icons/go";
import FAQAccordion from "./FAQAccordion";
import ReviewsSection from "./ReviewsSection";
import CommentForm from "./CommentForm";

const TourDetailsSection = () => {
  const highlights = [
    "Experience the thrill of a speedboat to the stunning Phi Phi Islands",
    "Be amazed by the variety of marine life in the archepelago",
    "Enjoy relaxing in paradise with white sand beaches and azure turquoise water",
    "Feel the comfort of a tour limited to 35 passengers",
    "Catch a glimpse of the wild monkeys around Monkey Beach",
  ];

  const included = [
    "Beverages, drinking water, morning tea and buffet lunch",
    "Local taxes",
    "Hotel pickup and drop-off by air-conditioned minivan",
    "InsuranceTransfer to a private pier",
    "Soft drinks",
    "Tour guides",
    "Towel",
    "Tips",
    "Alcoholic Beverages",
  ];
  return (
    <div className="col-span-4 md:col-span-8 flex flex-col items-start gap-y-4 md:gap-y-8">
      <div className="flex flex-col items-start gap-y-3 md:gap-y-5">
        <h1 className={`${styles.blueText} text-2xl font-bold`}>
          Tour Overview
        </h1>
        <p className={`${styles.blueText} text-sm font-normal`}>
          The Phi Phi archipelago is a must-visit while in Phuket, and this
          speedboat trip whisks you around the islands in one day. Swim over the
          coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel at
          Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized in
          "The Beach." Boat transfers, snacks, buffet lunch, snorkeling
          equipment, and Phuket hotel pickup and drop-off all included.
        </p>
        <h6 className={`text-lg font-medium ${styles.blueText}`}>
          Tour Highlights
        </h6>
        <ul className="list-inside flex flex-col gap-y-1">
          {highlights.map((highlight, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <GoDotFill className="w-3 h-3" />
                <li className="text-sm">{highlight}</li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="border w-full"></div>
      <div className="flex flex-col items-start gap-y-3 md:gap-y-5">
        <h5 className="font-bold text-2xl">What's included</h5>
        <ul className="list-inside flex flex-col gap-y-1">
          {included.map((i, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <GoDotFill className="w-3 h-3" />
                <li className="text-sm">{i}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TourDetailsSection;
