// import React, { useEffect } from 'react'
// import { Routes,Route, data } from 'react-router-dom'
// import Home from './Pages/Home'
// import Layout from './Pages/Layout'
// import Resumebuilder from './Pages/Resumebuilder'
// import Preview from './Pages/Preview'
// import Dashboard from './Pages/Dashboard'
// import { Import } from 'lucide-react'
// import Login from './Pages/Login'
// import { useDispatch } from 'react-redux'
// // import {Toaster, toaster} from 'react-hot-toast'
// import { Toaster } from 'react-hot-toast'
// import { login, setLoading } from './app/features/authSlice'
// import api from './utils/api'




// const App = () => {

//   const dispatch=useDispatch()

//   const getUserData =async()=>{
//     const token =localStorage.getItem('token')
//     try{
//       if (token){
//        const {data}=await api.get('/api/users/data',{headers:{Authorization:token}})

    
//     if(data.user){
//       dispatch(login({token,user:data.user}))
//     }
//     dispatch(setLoading(false))
//   }
//   else{
//     dispatch(setLoading(false))
//     // console.log(error.message)
//   }
//   }
//     catch(error){
//    dispatch(setLoading(false))
//    console.log(error.message)
//     }
//   }

//   useEffect(()=>{
//     getUserData()
//   },[])

//   return (
//     <>
//     <Toaster/>
//      <Routes>
//      <Route path='/' element={<Home/>}/>
//      <Route path='app' element={<Layout/>}>
//       <Route index element ={<Dashboard/>}/>
//       <Route path='builder/:resumeId' element={<Resumebuilder/>}/>
//     </Route>
//     <Route path='view/:resumeId' element={<Preview/>}/>
    
//       </Routes> 
//     </>
//   )
// }

// export default App



import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Resumebuilder from './Pages/Resumebuilder'
import Preview from './Pages/Preview'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import { useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { login, setLoading } from './app/features/authSlice'
import api from './utils/api'

const App = () => {

  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      const { data } = await api.get('/api/users/data')

      if (data.user) {
        dispatch(login({
          token: localStorage.getItem("token"),
          user: data.user
        }))
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      getUserData()
    } else {
      dispatch(setLoading(false))
    }
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<Resumebuilder />} />
        </Route>
        <Route path='view/:resumeId' element={<Preview />} />
      </Routes>
    </>
  )
}

export default App
