//display all of the images

import React,{useState} from 'react'
import {Routes,Route} from 'react-router-dom'

import {Navbar , Feed ,PinDetail,CreatePin ,Search} from '../components/index.jsx'



const Pins = ({user}) => {
  //we share this state across multiple component
  const [searchTerm , setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
      </div>
      <div className='h-full'>
        <Routes>
            <Route path="/" element={<Feed/>}/>
            <Route path="/category/:categoryId" element={<Feed/>}/ >
            <Route path="/pin-detail/:pinId" element={<PinDetail user={user}/>}/>
            <Route path="/create-pin" element={<CreatePin user={user}/>}/>
            <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={searchTerm}/>}/>

        </Routes>

      </div>

    </div>
  )
}

export default Pins