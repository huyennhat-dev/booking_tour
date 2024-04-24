import React from "react";
import { styles } from "../styles/styles";
import BookingTourCard from "../components/booking/BookingTourCard";
import BookingForm from "../components/booking/BookingForm";
import PaymentMethodComponent from "../components/booking/PaymentMethod";

const BookingPage = () => {
  return (
    <div className={`${styles.horizontalPadding} py-6 px-2 mb-10`}>
      <div className="w-full md:gap-x-6 grid grid-cols-1 md:grid-cols-12">
        <BookingTourCard />
        <BookingForm />
        <PaymentMethodComponent />
      </div>
    </div>
  );
};

export default BookingPage;
