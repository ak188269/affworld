import React, { useEffect, useState } from 'react'
import { useUser } from '../../provider/UserProvider'
import Secret from '../secret/Secret';
import { addSecret, getAllSecret } from '../../services/secret';
import toast from 'react-hot-toast';


const Home = () => {
    const {user , setUser} = useUser();
    const info = 'You have not written your secret write you secret message to show other anonymously';
    const [secret , setSecret] = useState(user?.secret?.secret || info);
  const [allSecret , setAllSecret] = useState([]);
    const handleSecretSubmission  = async () =>{
      if(!secret.trim() || secret == info)
      {
        toast.error("Please enter a secret")
        return ;
      }
      const [response , error] = await addSecret(secret);
      if(error)
        {
          toast.error(error.message);
          return ;
        }
        toast.success(response.message);
        setUser(response.data);
    }

    const getSecrets = async ()=>{
      const [response , error] = await getAllSecret();
      if(error)
      {
        toast.error('error getting secrets');
        return;
      }
      setAllSecret(response.data);
    }
    useEffect(()=>{
      getSecrets()
    },[]);
  return (
   <>
    <div className='p-1 flex flex-col gap-2 w-full sm:pl-4 md:pl-1'>
    <h1 className='font-semibold text-xl m-2'>
        Welcome {user?.name || 'user'}
    </h1>
    {/* ------ if user have not written secret -------- */}
  {!user?.secret &&  <div className='my-2'>
      <input type="text" placeholder='write your secret .. ✍️' className='border-2 rounded p-1' onChange={(e)=>setSecret(e.target.value)}/>
      <button onClick={handleSecretSubmission} className='bg-green-500 text-white ml-2 rounded px-4 py-1'>Save</button>
    </div>}
  <div className='flex gap-2 flex-wrap lg:gap-3 w-full'>

        <Secret secret={secret} isUser={true}/>
    
   
  {
    allSecret.map((element,ind)=>{
      if(element?.user.toString()!== user._id)
        return (
            <Secret  key={ind} secret={element?.secret}/>
        )
    })
   }
  </div>
    </div>
   </>
  )
}

export default Home;