import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

interface PaginationProp {
    postsPerPage: number;
    totalPosts: number;
    paginate: (number: number) => void;
    currentPage: number;
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }: PaginationProp) => {
    const pageNumbers = [];
    const pagelink = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    const pageitem = "";
    const pagelinkcur = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    const pagelinkright = "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    const pagelinkleft = "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    const pagination = "relative z-0 inline-flex rounded-md shadow-sm -space-x-px";
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    共计{"  "}
                    <span className="font-medium">{totalPosts}</span> 记录
                </p>
            </div>
            <nav className={pagination}>
                <div key="left" className={pageitem}>
                    <a onClick={() => paginate(currentPage - 1)} className={pagelinkleft}>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                </div>
                {pageNumbers.map((number) => (
                    <div key={number} className={pageitem}>
                        <a href="#" onClick={() => paginate(number)} className={currentPage == number ? pagelinkcur : pagelink}>
                            {number}
                        </a>
                    </div>
                ))}
                <div key="right" className={pageitem}>
                    <a onClick={() => paginate(currentPage + 1)} className={pagelinkright}>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />

                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Pagination;