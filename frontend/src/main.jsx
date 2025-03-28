import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './components/ui/provider'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>,
  // </StrictMode>,
)
