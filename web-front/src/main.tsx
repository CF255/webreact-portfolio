import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.tsx'
import Signup from './routes/Signup.tsx'
import Login from './routes/Login.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
  Dashboard,
  TresEnRaya,
  ApiPelis,
  Giffy,
  Perfil,
  Notes,
  Messages,
  AdminPage,
} from './routes/lazyRoutes.ts'



const router = createBrowserRouter([

{
  path: "/",
  element: <Home/>
},
{
  path: "/login",
  element: <Login/>
},
{
  path: "/signup",
  element: <Signup/>
},
{
  element: <ProtectedRoute/>,
  children:[
    {
      path:"/dashboard",
      element: <Dashboard/>
    },
    {
      path:"/tresenraya",
      element: <TresEnRaya/>
    },
    {
      path:"/apipelis",
      element: <ApiPelis/>
    },
    {
      path:"/giffy",
      element: <Giffy/>
    },
    {
      path:"/giffy/gif/:id",
      element:<Giffy/>
    },
    {
      path:`/perfil/:id`,
      element:<Perfil/>
    },
    {
      path:`/perfil/notes/:id`,
      element:<Notes />
    },
    {
      path:`/messages/:id`,
      element:<Messages />
    },
    {
      path:`/adminpage/:id`,
      element:<AdminPage />
    }
  ]
}
])

library.add(fas)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  
  </React.StrictMode>,
)
