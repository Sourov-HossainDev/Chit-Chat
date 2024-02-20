import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { HiDotsVertical } from "react-icons/hi"

const Search = () => {
  return (
    <>
      <div className='relative'>
        <input type="text" placeholder='Search' className='border w-full bg-white outline-none rounded-[20px] pt-[17px] pb-[18px] pl-[72px] text-[16px] font-mideum  ' />
        <FaMagnifyingGlass className='absolute top-[20px] left-[23px] text-2xl  '/>
        {/* <HiDotsVertical className='absolute top-[16px] right-[15px] text-3xl '/> */}
      </div>
    </>
  )
}

export default Search