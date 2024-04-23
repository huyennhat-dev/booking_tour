import React, { useState } from "react";
import TourListCard from "./TourListCard";
import { tourlist } from "../../constants/tourlist";
import Button from "../global/Button";
import Pagination from "./Pagination";

const List = () => {
  const [data, setData] = useState(tourlist);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [openDropdown, setOpenDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="col-span-3 flex flex-col justify-start items-start gap-2">
      <div className="w-full flex justify-between items-center p-4 relative">
        <p className="text-base font-normal">{data.length} Results</p>
        {/* <p className="text-sm font-normal">Sort by: Featured</p> */}
      </div>
      <div className="w-full px-2 md:px-3 py-2 flex flex-col gap-4">
        {currentPosts.map((tour, index) => (
          <TourListCard key={index} tour={tour} />
        ))}
      </div>
      <div className="w-full py-5 flex justify-center items-center gap-4">
        <Pagination
          totalPosts={data.length}
          postPerPage={postPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default List;
