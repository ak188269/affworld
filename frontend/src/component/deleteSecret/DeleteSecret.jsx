import React from 'react'
import {deleteSecret} from "../../services/secret";
import toast from 'react-hot-toast';
import { useUser } from '../../provider/UserProvider';
const DeleteSecret = ({setTab}) => {
  const {user , setUser} = useUser();
  const handleNo = ()=>{
    setTab(1);
    return;
  }
  const handleDelete = async ()=>{
    const [response , error] = await deleteSecret(user?.secret._id);
    if(error)
    {
      toast.error(error.message);
      return;
    }
    setUser(response.data);
    toast.success(response.message);
    setTab(1);
  }
  return (
   <>
   <div className='w-full h-screen flex justify-center items-center'>
   {user?.secret?.secret ? <div className=' h-max rounded flex flex-col gap-3 border-2 p-3'>

<div className=''>
  Are you sure you want to delete ? 
</div>
<div className='flex justify-between w-full'>
  <button className='py-1 px-4 bg-red-600 rounded text-white' onClick={handleDelete}>Yes</button>
  <button className='py-1 px-4 bg-green-600 rounded text-white' onClick={handleNo}>No</button>
</div>
</div> : 
<div>
  <div>You don`t have any secret to delete</div>
  <button className='py-1 px-4 bg-blue-600 rounded text-white' onClick={handleNo}>Go back</button>
</div>
}
   </div>
   </>
  )
}

export default DeleteSecret