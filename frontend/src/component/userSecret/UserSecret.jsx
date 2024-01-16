import React from 'react'

const UserSecret = () => {
  return (
   <div className='h-screen flex  justify-center items-center w-full'>
    <form className='flex flex-col gap-2 border-0 h-max px-2 py-3 rounded'>
        <h1 className='font-semibold text-lg'>Your secret</h1>
        
        <textarea name="" id="" cols="30" rows="6" className='border-2 p-2 resize-none' placeholder='write your secret .. ✍️'></textarea>

        <button className='py-1 px-4 border bg-[#0C2D48] text-white rounded'>Submit</button>
    </form>
  </div>
  )
}

export default UserSecret