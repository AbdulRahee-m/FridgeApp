import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FridgePage from './Components/pages/FridgePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FridgePage />
  </StrictMode>,
)
