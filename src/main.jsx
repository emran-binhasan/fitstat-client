import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import AuthProvider from './context/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <RouterProvider router={Router}/>
    </AuthProvider>
  </QueryClientProvider>
  </HelmetProvider>
  </StrictMode>,
)
