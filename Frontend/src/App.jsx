import React from 'react'
import Signup from './Components/Signup'
import { pagePath } from './Router/pagePath'
import { Route, Routes } from 'react-router'
import Login from './Components/Login'
import Home from './Pages/Home'
import MainHome from './Pages/MainHome'

function App() {
  return (
  <Routes>
    <Route path={pagePath.SIGNUP} element={<Signup/>}/>
    <Route path={pagePath.LOGIN} element={<Login/>}/>
    <Route path={pagePath.HOME} element={<Home/>}/>
    <Route path={pagePath.MAINHOME} element={<MainHome/>}/>
  </Routes>
  )
}

export default App