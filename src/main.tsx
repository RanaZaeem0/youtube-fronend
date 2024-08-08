import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllVideo from "./compount/AllVideo.tsx"
import { Provider } from 'react-redux';
import store from './store/store.ts';
import NavBar from './compount/NavBar.tsx';
import WatchVideo from './compount/WatchVideo.tsx';
import Signup from "./compount/Signup.tsx"
import PublishVideo from './compount/PublishVideo.tsx';
import Signin from './compount/Signin.tsx';
import Profile from "./compount/Profiles/Profile.tsx"
import WatchHistory from './compount/Profiles/WatchHistory.tsx';
import AuthLayout from './compount/AuthLayout.tsx';
import ChannalProfile from './compount/Profiles/ChannalProfile.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:    <App/>,
   children:[
    {
      path:"/",
      element:<AllVideo/>
    },
    {
      path:"/watch/:videoId",
      element:<WatchVideo/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/signin",
      element:<Signin/>
    },
    {
      path:"/channal/profile/:username",
      element:<ChannalProfile/>
    },
    {
      path:"/publishvideo",
      element:<AuthLayout>
        <PublishVideo/>
      </AuthLayout>       
    },
    {
      path:"/profile/:username",
      element:<AuthLayout>
        <Profile/>
      </AuthLayout>
    },
    
      {
        path:"/watchhistory",
        element:<AuthLayout>
          <WatchHistory/>
        </AuthLayout>
      }

   ]
  }


])
const rootElement = document.getElementById('root');
if(rootElement){
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
    <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )

}