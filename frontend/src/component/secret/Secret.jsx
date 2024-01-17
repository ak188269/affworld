import React from 'react'

const Secret = ({secret="Some secret message" , isUser = false}) => {
  return (
   <>
   <div className='border border-black  rounded-lg   w-[175px] sm:w-[30%] aspect-square max-w-[230px] flex flex-col relative'>
    <img src={"/images/pin_blue.png"} alt="." className='w-[35px] absolute -top-3 -left-3'/>
    <h1 className={`p-1 px-2 bg-[#0C2D48] text-white rounded-tl-lg rounded-tr-lg`}> {isUser ? "Your" : "Someone" }  secret </h1>
    <div className={`p-2  text-ellipsis text-sm ${isUser ? 'text-[red]' : 'text-black'}`}>
      
        {secret}
   </div>
   </div>
   </>
  )
}

export default Secret