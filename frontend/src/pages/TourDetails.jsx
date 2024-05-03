/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styles } from "../styles/styles";
import HeaderSection from "../components/TourDetails/HeaderSection";
import TourDetailsSection from "../components/TourDetails/TourDetailsSection";
import TourBookingCard from "../components/TourDetails/TourBookingCard";

import homeApi from "../apis/homeApi";
import { calculateDateDifference } from "../utils";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const TourDetails = () => {
  const params = useSearchParams();
  const state = useSelector((state) => state.auth);

  const [tour, setTour] = useState({});

  useEffect(() => {
    homeApi
      .getTour(params[0].get("id"))
      .then((rs) => {
        const data = rs.data;
        data.photos = rs.data.photos.split(",");
        setTour(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params[0].get("id")]);

  const navigate = useNavigate();

  const handleBooking = () => {
    if (!state.isLoggedIn) return toast.warning("Bạn cần phải đăng nhập!");
    navigate(`/booking/${tour.id}`);
  };

  return (
    <div className={`${styles.horizontalPadding} py-6 px-2 mb-10`}>
      <div className="flex flex-col gap-y-12 px-2 md:px-0">
        <HeaderSection
          nameTour={tour.tour_name}
          destination={tour.destination}
          vehicles={tour.vehicle}
          photos={tour.photos}
          point_rating={tour.point_rating}
          differenceInDays={calculateDateDifference(
            tour.departure_day,
            tour.end_tour_day
          )}
        />

        <div className="w-full md:gap-x-6 grid grid-cols-1 md:grid-cols-12">
          <TourDetailsSection
            introduce={tour.introduce}
            highlight={tour.highlight}
          />
          <TourBookingCard
            handleBooking={handleBooking}
            tourGuide={true}
            meal={tour.meal}
            insurance={tour.insurance}
            price={tour.initial_price}
            promotional={tour.promotional}
            departure_day={tour.departure_day}
            end_tour_day={tour.end_tour_day}
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
