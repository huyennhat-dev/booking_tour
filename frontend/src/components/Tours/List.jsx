/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TourListCard from "./TourListCard";
import Pagination from "./Pagination";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";
import { NotFound } from "../../assets/export";

const List = ({ rs }) => {
  const tourList = rs.data;
  const modifiedTours = tourList?.map((tour) => {
    return {
      ...tour,
      photos: tour.photos?.split(","),
    };
  });
  const sortData = [
    { title: "Sắp xếp theo giá cao đến thấp", value: "price-decrease" },
    { title: "Sắp xếp theo giá thấp đến cao", value: "price-increases" },
    { title: "Sắp xếp theo đánh giá", value: "rating" },
  ];

  const [data, setData] = useState();


  useEffect(() => {
    setData(modifiedTours);
  }, [tourList]);


  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [sortType, setSortType] = useState("");

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectSortType = (event) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);
    sortTours(selectedSortType);
  };

  const sortTours = (type) => {
    let sortedData = [...modifiedTours];
    switch (type) {
      case "price-decrease":
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case "price-increases":
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        sortedData.sort((a, b) => b.rate - a.rate);
        break;
      default:
        break;
    }
    setData(sortedData);
  };
  return (
    <div className="col-span-3 flex flex-col justify-start items-start gap-2">
      {data?.length > 0 ? (
        <div className="w-full flex justify-between items-center p-4 relative">
          <p className="text-base font-normal">
            <strong className={styles.orangeText}>{data?.length}</strong> kết
            quả
          </p>
          <div className="text-sm font-normal flex items-center">
            <label htmlFor="" className=" text-nowrap font-semibold">
              Bộ lọc:
            </label>
            <select
              value={sortType}
              onChange={handleSelectSortType}
              className="h-full w-full text-sm px-3 text-slate-700 outline-none border-b-[1px] border-b-[color:#f57a45] py-2"
            >
              {sortData.map((s, index) => (
                <option key={index} value={s.value}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 px-3 md:px-8 lg:px-16 xl:px-18 py-16">
          <div>
            <img src={NotFound} alt="" />
          </div>
          <div className="h-full w-full col-span-1 flex items-center">
            <div className="text-center w-full">
              <p className="text-xl">Không tìm thấy kết quả nào</p>
              <div className="w-full py-2  my-5">
                <Link
                  to="/"
                  className="delay-75 duration-100 ease-in-out w-[200px] px-8 py-2  my-5 border-[1px] border-[color:#eb662b] rounded-md hover:bg-[color:#eb662b] hover:text-white"
                >
                  Trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full px-2 md:px-3 py-2 flex flex-col gap-4">
        {currentPosts?.map((tour, index) => (
          <TourListCard key={index} tour={tour} />
        ))}
      </div>
      <div className="w-full py-5 flex justify-center items-center gap-4">
        {data?.length > 10 && (
          <Pagination
            totalPosts={data?.length}
            postPerPage={postPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default List;
