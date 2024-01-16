import React, { useState } from 'react'
import { useUser } from '../../provider/UserProvider'
import Secret from '../secret/Secret';
import UserSecret from '../userSecret/UserSecret';

const Home = () => {
    const {user} = useUser();
    const [secret , setSecret] = useState(user?.secret || 'You have not written your secret write you secret message to show other anonymously');
  return (
   <>
    <div className='p-1 flex flex-col gap-2'>
    <h1 className='font-semibold text-lg'>
        Welcome {user?.name || 'user'}
    </h1>
    {/* ------ if user have not written secret -------- */}
  {!user?.secret &&  <div>
      <input type="text" placeholder='write your secret .. ✍️' className='border-2 rounded p-1' onChange={(e)=>setSecret(e.target.value)}/>
      <button className='bg-green-500 text-white ml-2 rounded px-4 py-1'>Save</button>
    </div>}
  <div className='flex gap-2 flex-wrap lg:gap-3'>

        <Secret secret={secret} isUser={true}/>
    
   
  {
    Array.from({length:5}).map((_,ind)=>{
        return (
            <Secret  key={ind}/>
        )
    })
   }
  </div>
    </div>
   </>
  )
}

export default Home