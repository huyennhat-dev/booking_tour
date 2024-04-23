import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import Banner from "../../components/User/Banner";
import Heading from "../../components/User/Heading";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Recommend from "../../components/User/Recommend";

const SearchPage = () => {
  const [sorting, setSorting] = useState("default");

  const handleSetSorting = (e) => {
    setSorting(e.target.value);
  };

  useEffect(() => {
    console.log(sorting);
  }, [sorting]);

  const data = [
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
      departurePoint: "Đà Nẵng",
      price: 1290000,
      sale: 0.31,
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
      departurePoint: "Đà Nẵng",
      price: 1290000,
      sale: 0.31,
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
      departurePoint: "Đà Nẵng",
      price: 1290000,
      sale: 0.31,
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
      departurePoint: "Đà Nẵng",
      price: 1290000,
      sale: 0.31,
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
      departurePoint: "Đà Nẵng",
      price: 1290000,
      sale: 0.31,
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
      departurePoint: "Đà Nẵng",
      price: 1290000,
      sale: 0.31,
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
      departurePoint: "Đà Nẵng",
      price: 1290000,
      sale: 0.31,
    },
  ];

  return (
    <>
      <Navbar />
      <Banner />
      <main>
        <Heading title="Kết quả tìm kiếm" />

        <div className="w-full px-28 flex justify-between">
          <div className="w-[25%]">
            <div className="mb-8"></div>
            <div className="py-6 px-8 rounded-md border-[1px] shadow-custom ">
              <h6 className="font-bold text-[20px]">Sắp xếp</h6>
              <div className="">
                <input
                  className=" mx-4"
                  value="default"
                  onChange={handleSetSorting}
                  type="radio"
                  name="sorting"
                  id="default"
                  checked={sorting === "default"}
                />
                <label
                  htmlFor="default"
                  className="text-black font-normal text-[16px]"
                >
                  Mặc định
                </label>
              </div>
              <div className="">
                <input
                  className=" mx-4"
                  value="rate"
                  onChange={handleSetSorting}
                  type="radio"
                  name="sorting"
                  id="rate"
                />
                <label
                  htmlFor="rate"
                  className="text-black font-normal text-[16px]"
                >
                  Đánh giá cao nhất
                </label>
              </div>
              <div className="">
                <input
                  className=" mx-4"
                  value="increase"
                  onChange={handleSetSorting}
                  type="radio"
                  name="sorting"
                  id="increase"
                />
                <label
                  htmlFor="increase"
                  className="text-black font-normal text-[16px]"
                >
                  Giá tăng dần
                </label>
              </div>
              <div className="">
                <input
                  className=" mx-4"
                  value="decrease"
                  onChange={handleSetSorting}
                  type="radio"
                  name="sorting"
                  id="decrease"
                />
                <label
                  htmlFor="decrease"
                  className="text-black font-normal text-[16px]"
                >
                  Giá giảm dần
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4 p-2 shadow-custom rounded-md">
              <Recommend />
            </div>
          </div>
          <div className="w-[73%]">
            <div className="w-full">
              <p className="text-right pb-2 pr-2">
                Đà nẵng, 2 người lớn, 0 trẻ em, 0 con nhỏ, Ngày 02/03/2024
              </p>
            </div>
            <div className="py-6 px-8 rounded-md border-[1px] shadow-custom">
              <div className=" grid grid-cols-1 gap-3">
                {data.map((tour, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={tour.img}
                      alt=""
                      className="w-[200px] mr-3 rounded-sm"
                    />
                    <div className="py-3 border-b-[1px] border-gray-500 w-full">
                      <h6 className="font-semibold text-[16px] title">
                        {tour.title}
                      </h6>
                      <p className="text-[14px] text-blue-500">
                        Xuất phát: {tour.departurePoint}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className=" ml-2 my-1 font-bold text-[color:var(--color-primary)] text-[20px]">
                            {tour.price - tour.price * tour.sale} đ
                            <span className="text-red-500 ml-4 text-[16px]">
                              Giảm {tour.sale * 100}%
                            </span>
                          </p>
                          <p className="ml-2 line-through font-semibold text-black">
                            {tour.price} đ
                          </p>
                        </div>

                        <NavLink
                          to="/"
                          className="hover:bg-[color:var(--color-primary)] hover:text-white font-medium duration-100 ease-in-out px-4 py-[2px] h-[32px] border-[1px] border-gray-300 rounded-md"
                        >
                          Xem chi tiết
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
