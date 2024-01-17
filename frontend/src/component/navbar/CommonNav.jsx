import React, { useState } from 'react'
import { useUser } from '../../provider/UserProvider'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/user';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '@mui/icons-material/Logout';

const CommonNav = ({tab , setTab ,setVisible, isMobile=false}) => {
    const {user ,setUser} = useUser();
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
 

    const navMenu = [  { icon: <HomeIcon fontSize='small'/>, name: "Home" },
    { icon: <EditIcon fontSize='small'/>, name: user?.secret?.secret ? "Edit your secret" : 'Write your secret' },
    { icon: <DeleteIcon fontSize='small'/>, name: "Delete your secret" },
    { icon: <InfoIcon fontSize='small'/>, name: "About us" },]
    
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
    <div className='flex flex-col  gap-3 mt-3'>
{
    navMenu.map((menu,ind)=>{
       return (
        <div key={ind} className={`px-3 py-1 rounded cursor-pointer hover:bg-[#2E8BC0] ${tab == (ind+ 1) ? 'bg-[#2E8BC0]' : ""} flex gap-2 items-center`} onClick={()=>changeTab(ind+1)}>
      {/* <img src={menu.icon} alt="." className='w-[18px]' /> */}
      {menu.icon}
      <div className='text-sm'>{menu.name}</div>
    </div>
       )
    })
}
</div>

{/* log out button----------- */}
<button onClick={handleLogout} className="bg-[#2E8BC0] w-max text-white p-1 px-3  rounded mt-auto hover:bg-[#48a7de]" type="submit">
         {loading ? 'processing ..' : 
         <div className='flex gap-1 items-center'>
          <LogoutIcon fontSize='small'/>
          <span>Log out</span>
         </div>

         }
          </button>
  </nav>
  )
}

export default CommonNav