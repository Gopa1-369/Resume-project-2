import React, { useEffect } from 'react'
import {createBrowserRouter,RouterProvider}from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'

import Home from './container/Home'
import Login from './components/Login'
import { fetchUser } from './utils/fetchUser'

const router =createBrowserRouter(
  [
    {
      path:"login",
      element:<Login/>
    
    },
    
    {
      path:"/*",
      element:<Home/>
    
    },
    
    


  ]
)

const App = () => {




  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
    <div>
        <RouterProvider router={router} />
     
    </div>
    </GoogleOAuthProvider>
  )
}

export default App