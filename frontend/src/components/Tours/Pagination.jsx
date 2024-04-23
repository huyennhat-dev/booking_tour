import React from "react";
import { styles } from "../../styles/styles";

// const Pagination = ({ totalPosts, postPerPage }) => {
//   let pages = [];
//   for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
//     pages.push(i);
//   }
//   return (
//     <div>
//       {pages.map((page, index) => {
//         return (
//           <button key={index} className="w-5 h-5 border mx-2">
//             {page}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

const Pagination = ({ totalPosts, postPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`w-10 h-10 rounded-full mx-2 text-sm ${
            currentPage === number ? `${styles.bgOrange} text-white` : `border`
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
