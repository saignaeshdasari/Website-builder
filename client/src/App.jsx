import React from 'react'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import UseGetCurrentUser from './hooks/UseGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import WebEditor from './pages/Editor'
import LiveSite from './pages/LiveSite'
import Pricing from './pages/Pricing'
export const serverUrl="https://website-builder-ze0q.onrender.com"
const App = () => {
  UseGetCurrentUser()
  const {userData} = useSelector(state=>state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Home />}
        />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />

        <Route
          path="/editor/:id"
          element={userData ? <WebEditor /> : <Home />}
        />
        <Route path="/site/:slug" element={<LiveSite />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
