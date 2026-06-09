import React from 'react'
import Signup from './Components/Signup'
import { pagePath } from './Router/pagePath'
import { Route, Routes } from 'react-router'

function App() {
  return (
  <Routes>
    <Route path={pagePath.SIGNUP} element={<Signup/>}/>
  </Routes>
  )
}

export default App