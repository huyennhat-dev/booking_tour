import React from "react";
import Hero from "../components/Home/Hero";
import FindPopularTours from "../components/Home/FindPopularTours";
import WhyChooseToursSection from "../components/Home/WhyChooseToursSection";
import TrendingDestinationsSection from "../components/Home/TrendingDestinationsSection";
import GrabSaleSection from "../components/Home/GrabSaleSection";
import PopularThingsToDoSection from "../components/Home/PopularThingsToDoSection";
import TopTrending from "../components/Home/TopTrending";
import ReviewsSection from "../components/Home/ReviewsSection";
import BookingSection from "../components/Home/BookingSection";
import ArticlesSection from "../components/Home/ArticlesSection";

const Home = () => {
  return (
    <>
      <Hero />
      <WhyChooseToursSection />
      <TrendingDestinationsSection />
      <FindPopularTours />
      <GrabSaleSection />
      <PopularThingsToDoSection />
      <TopTrending />
      <ReviewsSection />
      {/* <BookingSection /> */}
      <ArticlesSection />
    </>
  );
};

export default Home;
