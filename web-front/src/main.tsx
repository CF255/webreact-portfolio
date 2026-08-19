import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './routes/Signup.tsx'
import Login from './routes/Login.tsx'
import Dashboard from './routes/Dashboard.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import TresEnRaya from './routes/TresEnRaya.jsx'
import ApiPelis from './routes/ApiPelis.jsx'
import Giffy from './routes/Giffy.jsx'
import Perfil from './routes/Perfil.jsx'
import Notes from './routes/Notes.tsx'
import Messages from './routes/Messages.jsx'
import AdminPage from './routes/AdminPage.tsx'



const router = createBrowserRouter([

{
  path: "/login",
  element: <Login/>
},
{
  path: "/signup",
  element: <Signup/>
},
{
  path: "/",
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
