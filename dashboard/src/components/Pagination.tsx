import React from 'react'

interface PaginationProps {
    postsPerPage: number;
    length: number;
    handlePagination: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, length, handlePagination, currentPage }) => {
    let paginationNumber = []
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i);
    }
    return (
        <div className='pagination'>
            {
                paginationNumber.map((data) => (
                    <button key={data} onClick={() => handlePagination(data)} className={currentPage === data ? 'active' : ''}>
                        {data}
                    </button>
                ))
            }
        </div>
    )
}
export default Pagination