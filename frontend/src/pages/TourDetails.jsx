import React from "react";
import { useSearchParams } from "react-router-dom";
import { styles } from "../styles/styles";
import HeaderSection from "../components/TourDetails/HeaderSection";
import TourDetailsSection from "../components/TourDetails/TourDetailsSection";
import TourBookingCard from "../components/TourDetails/TourBookingCard";
import FAQAccordion from "../components/TourDetails/FAQAccordion";
import ReviewsSection from "../components/TourDetails/ReviewsSection";
import CommentForm from "../components/TourDetails/CommentForm";
import { tourDetail } from "../_mock/tourData";

import useDaysDifference from "../hooks/useDaysDifference";
const TourDetails = () => {
  const { title } = useSearchParams();
  const differenceInDays = useDaysDifference(
    tourDetail.departure,
    tourDetail.end_tour
  );
  return (
    <div className={`${styles.horizontalPadding} py-6 px-2 mb-10`}>
      <div className="flex flex-col gap-y-12 px-2 md:px-0">
        <HeaderSection
          nameTour={tourDetail.name_tour}
          destination={tourDetail.destination}
          vehicles={{
            bus: tourDetail.bus,
            taxi: tourDetail.taxi,
            plane: tourDetail.plane,
            train: tourDetail.train,
          }}
          photos={tourDetail.photos}
          differenceInDays={differenceInDays}
        />

        <div className="w-full md:gap-x-6 grid grid-cols-1 md:grid-cols-12">
          <TourDetailsSection
            introduce={tourDetail.introduce}
            highlight={tourDetail.highlight}
          />
          <TourBookingCard
            tourGuide={tourDetail.tour_guide}
            meal={tourDetail.meal}
            insurance={tourDetail.insurance}
            price={tourDetail.initial_price}
            promotional={tourDetail.promotional}
          />
        </div>
        {/* <div className="flex flex-col items-start gap-y-4 md:gap-y-10 w-full md:w-4/5 md:pr-40">
        
          <div className="border w-full"></div>
          <ReviewsSection />
          <div className="border w-full"></div>
          <CommentForm />
        </div> */}
      </div>
    </div>
  );
};

export default TourDetails;
