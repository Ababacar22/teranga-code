import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './features/auth/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import { isDesktopApp } from './lib/platform'

// Pas de serveur pour gérer les chemins d'URL arbitraires dans l'app
// desktop, donc HashRouter (routes en #/...) plutôt que BrowserRouter.
const Router = isDesktopApp ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  </StrictMode>,
)
