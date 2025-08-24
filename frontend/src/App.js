import React from 'react'
import Layout from './components/common'
import HomeCom from './Pages/Home'
import { Route, Routes , BrowserRouter as Router} from 'react-router-dom';
import About from './Pages/About';
 import { Bounce, ToastContainer, toast } from 'react-toastify';
import Dashboard from './Pages/Dashboard';
import ContactPage from './Pages/ContactUs';
import { useUI } from './context/ui.context';
import { useEffect } from 'react';
import './assets/style/style.css'
import Courses from './Pages/Lectures';
const App = () => {
   const {setUserData} = useUI();
   useEffect(()=>{
      setUserData(JSON.parse(localStorage.getItem('loginData')||'{}'))
   },[])
  return (
<Router>
 <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
<Layout>
      <Routes>
        <Route path='/' element={<HomeCom/>
}/>
<Route path='/about-us' element={<About/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/contact-us' element={<ContactPage/>}/>
<Route path='/courses' element={<Courses/>}/>

      </Routes>
      </Layout>
     
</Router>
      
  )
}



export default App