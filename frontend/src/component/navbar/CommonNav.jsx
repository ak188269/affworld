import React, { useState } from 'react'
import { useUser } from '../../provider/UserProvider'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/user';
import toast from 'react-hot-toast';

const CommonNav = ({tab , setTab ,setVisible, isMobile=false}) => {
    const {user ,setUser} = useUser();
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const navMenu = ["Home",user?.secret?.secret ? "Edit your secret" : 'Write your secret','Delete your secret','About us']
    
    const handleLogout = async ()=>{
        setLoading(true);
        const [response , error] = await logout();
        setLoading(false);
        if(error){
            toast.error(error.message);
            return ;
        }
        toast.success(response.message);
        setUser(response.data);
        navigate("/")
      }
    
      const changeTab = (num)=>{
          setTab(num);
          if(isMobile)
          setVisible(false);
      }
  return (
    <nav className={`bg-[#145DA0] text-white flex flex-col gap-4 p-3 pr-0 h-screen  items-center min-w-[200px] ${'w-[200px]'}`}>
    <h1 className='text-3xl font-bold '>Affworld</h1>

    {/*  avatar*/}
    <div className='flex flex-col  items-center justify-center gap-2 mt-2'>
    <div className='w-[70px] aspect-square bg-[#2E8BC0] rounded-[50%] overflow-hidden'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRweqjaPPrrvV_mgmBhYSl_mSNFmAiG0GaVgPgnuMcHYbuMmBclsVD8Yx4qFN9rmLHYlgk&usqp=CAU" alt="."  className='transform scale-[1.1] '/>
    </div>
    <span className='font-semibold text-lg'> {user?.name}</span>
    </div>

    {/* ------- nav menu------- */}
    <div className='flex flex-col  gap-2 mt-3'>
{
    navMenu.map((menu,ind)=>{
       return (
        <div key={ind} className={`px-3 py-1 rounded cursor-pointer hover:bg-[#2E8BC0] ${tab == (ind+ 1) ? 'bg-[#2E8BC0]' : ""} `} onClick={()=>changeTab(ind+1)}>
      {menu}
    </div>
       )
    })
}
</div>

{/* log out button----------- */}
<button onClick={handleLogout} className="bg-[#2E8BC0] w-max text-white p-1 px-3  rounded mt-auto hover:bg-[#48a7de]" type="submit">
         {loading ? 'processing ..' : 'Log out'}
          </button>
  </nav>
  )
}

export default CommonNav