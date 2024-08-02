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