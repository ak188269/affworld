import React, { useState } from 'react'
import { useUser } from '../../provider/UserProvider'
import { addSecret, editSecret } from '../../services/secret';
import toast from 'react-hot-toast';

const UserSecret = ({setTab}) => {
  const {user , setUser} = useUser();
  const [secret , setSecret] = useState(user?.secret?.secret);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(user?.secret){
      
      // send request for editing
      const [response, error] = await editSecret(user?.secret?._id,secret);
      if(error){
        toast.error(error.message);
        return;
      }
      toast.success(response.message);
      setUser(response.data);
    }
    else {
      const [response , error] = await addSecret(secret);
      if(error)
        {
          toast.error(error.message);
          return ;
        }
        toast.success(response.message);
        setUser(response.data);
    }
    setTab(1);
  }
  return (
   <div className='h-screen flex  justify-center items-center w-full'>
    <form className='flex flex-col gap-2 border-0 h-max px-2 py-3 rounded' onSubmit={handleSubmit}>
        <h1 className='font-semibold text-lg'>Your secret</h1>
        
        <textarea name="" id="" cols="30" rows="6" className='border-2 p-2 resize-none' placeholder={secret ? secret : 'write your secret .. ✍️'} onChange={(e)=>setSecret(e.target.value)}></textarea>

        <button className='py-1 px-4 border bg-[#0C2D48] text-white rounded' >Submit</button>

        <span className='text-center text-blue-500 underline cursor-pointer' onClick={()=>setTab(1)}>go to home</span>
    </form>
  </div>
  )
}

export default UserSecret;