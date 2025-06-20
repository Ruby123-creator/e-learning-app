import React from 'react'
import Layout from './components/common'
import HomeCom from './Pages/Home'

import './App.css';
import { Route, Routes , BrowserRouter as Router} from 'react-router-dom';
import About from './Pages/About';
const App = () => {

  return (
<Router>

<Layout>
      <Routes>
        <Route path='/' element={<HomeCom/>
}/>
<Route path='/about-us' element={<About/>}/>
      </Routes>
      </Layout>
     
</Router>
      
  )
}



export default App