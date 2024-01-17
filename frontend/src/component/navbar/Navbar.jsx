import React, { useState } from 'react'
import CommonNav from './CommonNav'

import { Sidebar } from 'primereact/sidebar';
        

const Navbar = ({tab , setTab}) => {
  const [visible, setVisible] = useState(false);
   
  return (
  <>
  <div className=' sticky top-0 h-screen hidden md:block'>
    <CommonNav setTab={setTab} tab={tab}/>
  </div>

  {/* --- for smaller device --------- */}

  <div className='flex justify-between bg-[#145DA0] p-2 items-center md:hidden'>
    <div className='text-white text-3xl font-semibold cursor-pointer' onClick={()=>setTab(1)}>Affworld</div>
    <img src="/icons/hamburger.png" alt="" className='w-[25px] cursor-pointer' onClick={()=>setVisible((prev)=>!prev)}/>

    {/* -sidebar ------ */}
    <Sidebar visible={visible} onHide={() => setVisible(false)} position='right' style={{ width:"auto"}}
    content={()=>
      <CommonNav setTab={setTab} tab={tab} setVisible={setVisible} isMobile={true}/>
  }
    />
  
  </div>
  </>
  )
}

export default Navbar