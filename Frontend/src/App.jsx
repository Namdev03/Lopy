import React from 'react'
import Signup from './Components/Signup'
import { pagePath } from './Router/pagePath'
import { Outlet, Route, Routes } from 'react-router'
import Login from './Components/Login'
import Home from './Pages/Home'
import MainHome from './Pages/MainHome'
import PageNotFound from './Components/PagenoteFound'
import UserProfilePage from './Pages/UserProfilepage'
import Sidebar, { Layout } from './Components/SideBar'
import Protected from './Router/Protected.jsx'
import CommentForm from './Components/comment.jsx'
import NewPost from './Components/NewPost.jsx'

function App() {
  return (
    <Routes>
      <Route path={pagePath.SIGNUP} element={<Signup />} />
      <Route path={pagePath.LOGIN} element={<Login />} />
      <Route path={pagePath.HOME} element={<Home />} />

      <Route element={<Protected />}>
        <Route element={<Layout />}>
          <Route
            path={pagePath.MAINHOME}
            element={<MainHome />}
          />
          <Route
            path={pagePath.USERPROFILE}
            element={<UserProfilePage />}
          />
          <Route
            path="/comment/:id"
            element={<CommentForm />}
          />
           <Route
            path={pagePath.NEWPOST}
            element={<NewPost />}
          />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>

  )
}

export default App