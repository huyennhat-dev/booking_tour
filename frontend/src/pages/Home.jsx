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
import homeApi from "../apis/homeApi";

const Home = () => {
  const [data, setData] = useState({});

  const getData = () => {
    homeApi
      .getHomeData()
      .then((rs) => {
        const modifiedTours = {
          ...rs.data,
          popular:
            rs.data.popular?.length > 8
              ? rs.data.popular.slice(0, 8).map((tour) => {
                  return {
                    ...tour,
                    photos: tour.photos?.split(","),
                  };
                })
              : rs.data.popular?.map((tour) => {
                  return {
                    ...tour,
                    photos: tour.photos?.split(","),
                  };
                }),
          trend:
            rs.data.trend?.length > 8
              ? rs.data.trend.slice(0, 8).map((tour) => {
                  return {
                    ...tour,
                    photos: tour.photos?.split(","),
                  };
                })
              : rs.data.trend?.map((tour) => {
                  return {
                    ...tour,
                    photos: tour.photos?.split(","),
                  };
                }),
        };

        setData(modifiedTours);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Hero />
      <WhyChooseToursSection />
      <TrendingDestinationsSection />
      <FindPopularTours data={data.popular} />
      <GrabSaleSection />
      <TopTrending data={data.trend} />
      <PopularThingsToDoSection />
      <ArticlesSection />
    </>
  );
};

export default Home;
