/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Hero from "../components/Home/Hero";
import FindPopularTours from "../components/Home/FindPopularTours";
import WhyChooseToursSection from "../components/Home/WhyChooseToursSection";
import TrendingDestinationsSection from "../components/Home/TrendingDestinationsSection";
import GrabSaleSection from "../components/Home/GrabSaleSection";
import PopularThingsToDoSection from "../components/Home/PopularThingsToDoSection";
import TopTrending from "../components/Home/TopTrending";
import ArticlesSection from "../components/Home/ArticlesSection";

const mockData = {
  statusCode: 200,
  data: {
    popular: [
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
    ],
    trend: [
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
      {
        id: 1,
        tour_name:
          "Tour Quy Nhơn Phú Yên 3 ngày 4 đêm bằng tàu hỏa | Hầm Hô – Eo Gió – Gành Đá Đĩa",
        initial_price: 1000000,
        departure_day: "2024-11-22",
        end_tour_day: "2024-12-10",
        promotional: 0.15,
        destination: "ha-noi",
        vehicle: "plane",
        photos: [
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-1.jpg",
          "https://www.vietnambooking.com/wp-content/uploads/2024/04/tour-quy-nhon-phu-yen-3-ngay-4-dem-bang-tau-hoa-4.jpg",
        ],
        introduce: "",
        highlight: "",
        point_rating: 5,
        insurance: true,
        meal: true,
        max_user: 10,
        id_staff: 1,
        id_manager: 1,
      },
    ],
  },
};

const Home = () => {
  const [data, setData] = useState({});

  const getData = () => {
    //call api
    setData(mockData.data);
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
      <Hero />
      <WhyChooseToursSection />
      <TrendingDestinationsSection  />
      <FindPopularTours data={data.popular}/>
      <GrabSaleSection />
      <TopTrending data={data.trend}/>
      <PopularThingsToDoSection />
      <ArticlesSection />
    </>
  );
};

export default Home;
