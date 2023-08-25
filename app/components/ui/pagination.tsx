"use client"
import React from 'react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

const Pagination = () => {
    return (
        <div className="flex-center space-x-4 mt-28 px-5">
            <button className="button-pagination group">
                <BiLeftArrowAlt className="mr-1 text-lg dark:text-gray-200 group-hover:text-gray-200 text-gray-700"/>
                Previous
            </button>
            <div className="flexx">
                <div className="pagination-number font-inter">
                    <p className="text-sm font-medium text-center">1</p>
                </div>
            </div>
            <button className="button-pagination group">
                Next
                <BiRightArrowAlt className="ml-1 text-lg dark:text-gray-200 dark:group-hover:text-gray-200 group-hover:text-gray-200 text-gray-700"/>
            </button>
        </div>
    )
}

export default Pagination