import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import BookingTourCard from "../components/booking/BookingTourCard";
import BookingForm from "../components/booking/BookingForm";
import PaymentMethodComponent from "../components/booking/PaymentMethod";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import homeApi from "../apis/homeApi";
import { toast } from "react-toastify";

const BookingPage = () => {
  const param = useParams();
  const state = useSelector((state) => state.auth);

  const [tour, setTour] = useState({});

  const [formData, setFormData] = useState({
    id_user: 1,
    id_tour: 1,
    booking_info: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
      message: "",
    },
    member: 1,
    total_price: 0,
  });

  useEffect(() => {
    homeApi
      .getTour(param.tourId)
      .then((rs) => {
        const data = rs.data;
        data.photos = rs.data?.photos.split(",");
        setTour(data);
        setFormData((prev) => ({
          ...prev,
          id_tour: data.id,
          total_price:
            data.initial_price -
            data.initial_price * data.promotional +
            (data.initial_price - data.initial_price * data.promotional) * 0.03,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      id_user: state.userInfo?.id,
    }));
  }, [state]);

  const handleCheckout = () => {
    if (
      !formData.booking_info.name ||
      !formData.booking_info.email ||
      !formData.booking_info.address ||
      !formData.booking_info.phone_number ||
      !formData.booking_info.message
    ) {
      return toast.warning("Bạn phải nhập đầy đủ thông tin!");
    }

    homeApi
      .bookTour(formData)
      .then((rs) => {
        if (rs.vnpUrl) window.location.href = rs.vnpUrl;
      })
      .catch((err) => {
        toast.warning(err.response?.data?.message);
        console.log(err);
      });
  };

  return (
    <div className={`${styles.horizontalPadding} relative py-6 px-2 mb-10`}>
      <div className="w-full md:gap-x-6 grid grid-cols-1 md:grid-cols-12">
        <BookingTourCard
          data={tour}
          formData={formData}
          setFormData={setFormData}
        />
        <BookingForm formData={formData} setFormData={setFormData} />
        <PaymentMethodComponent handleCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default BookingPage;
