import React from 'react'
import Signup from './Components/Signup'
import { pagePath } from './Router/pagePath'
import { Outlet, Route, Routes } from 'react-router'
import Login from './Components/Login'
import Home from './Pages/Home'
import MainHome from './Pages/MainHome'
import PageNotFound from './Components/PagenoteFound'
import Protected from './Router/Protected.jsx'

function App() {
  return (
  <Routes>
    <Route path={pagePath.SIGNUP} element={<Signup/>}/>
    <Route path={pagePath.LOGIN} element={<Login/>}/>
    <Route path={pagePath.HOME} element={<Home/>}/>
  {/* =====Ptotected router===== */}
    <Route element={<Protected/>} >
    <Route path={pagePath.MAINHOME} element={<MainHome/>}/>
    </Route>
    <Route path="*" element={<PageNotFound />} />
  </Routes>

  )
}

export default App