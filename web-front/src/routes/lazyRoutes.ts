import { lazy } from 'react'

// Lazy-loaded: these only ship to visitors who actually log in,
// keeping the public landing page's initial bundle small.
export const Dashboard = lazy(() => import('./Dashboard.tsx'))
export const TresEnRaya = lazy(() => import('./TresEnRaya.jsx'))
export const ApiPelis = lazy(() => import('./ApiPelis.jsx'))
export const Giffy = lazy(() => import('./Giffy.jsx'))
export const Perfil = lazy(() => import('./Perfil.tsx'))
export const Notes = lazy(() => import('./Notes.tsx'))
export const Messages = lazy(() => import('./Messages.jsx'))
export const AdminPage = lazy(() => import('./AdminPage.tsx'))
