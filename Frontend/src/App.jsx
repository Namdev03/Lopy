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
import Suggestion from './Components/Suggestion.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { meAsync, suggestedUserAsync, userprofileAsync } from './Redux/userSlice.js'
import { allPostAsync, userOnePostAsync } from './Redux/postSlice.js'
import { axiosInstance } from './Services/axiosInstance.js'
import { userApiEndPoint } from './Router/UserEndPoints.js'
import Search from './Components/Search.jsx'
import UserOnePost from './Components/UserOnePost.jsx'
import Message from './Pages/message.jsx'
import Messages from './Components/Messages.jsx'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(meAsync());
    dispatch(allPostAsync());
    dispatch(userprofileAsync())
    dispatch(suggestedUserAsync())
  }, [dispatch]);
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
          <Route
            path={pagePath.SEARCH}
            element={<Search />}
          />
          <Route
            path={`${pagePath.USERONEPOST}/:id`}
            element={<UserOnePost/>}
          />
            <Route
            path={pagePath.MESSAGE}
            element={<Message/>}
          />
            <Route
            path={`${pagePath.MESSAGE}/:id`}
            element={<Messages/>}
          />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>

  )
}

export default App