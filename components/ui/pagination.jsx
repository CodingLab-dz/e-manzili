"use client"

import React from 'react'
import { Button } from './button'

const Pagination = ({ nPages, currentPage, setCurrentPage, }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)



    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <div className='w-fit h-fit flex flex-row justify-center items-center my-6'>
            <Button disabled={currentPage === 1} variant="outline" onClick={goToPrevPage} >Perv</Button>
            <div className='mx-6 flex items-center'>{currentPage} /{nPages}</div>
            <Button disabled={currentPage === nPages} variant="outline" onClick={goToNextPage}>Next</Button>
        </div>
    )
}

export default Pagination