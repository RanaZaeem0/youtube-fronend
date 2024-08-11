import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllVideo from "./compount/AllVideo"
import { Outlet } from 'react-router-dom'
import NavBar from "./compount/NavBar.tsx"
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="pt-12">
      <NavBar/>
      <Outlet />
    </div>
  )
}

export default App
