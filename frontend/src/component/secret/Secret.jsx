import React from 'react'

const Secret = ({secret="Some secret message" , isUser = false}) => {
  return (
   <>
   <div className='border border-black  rounded-lg overflow-hidden  w-[180px] sm:w-[30%] aspect-square max-w-[230px] flex flex-col'>
    <h1 className={`p-1 px-2 bg-[#0C2D48] text-white`}> {isUser ? "Your" : "Someone" }  secret </h1>
    <div className={`p-2 h-32  text-ellipsis text-sm ${isUser ? 'text-[red]' : 'text-black'}`}>
      
        {secret}
   </div>
   </div>
   </>
  )
}

export default Secret