import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')).render(
   <StrictMode>
   <HelmetProvider>
     <AuthProvider>
      <RouterProvider router={router} ></RouterProvider>
    </AuthProvider>
   </HelmetProvider>
  </StrictMode>,
)
