import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import App from './App.jsx'
import './style/app.css'
import UserContext from './context/UserContext.jsx'
createRoot(document.getElementById('root')).render(
<>
<UserContext>
 <App />
</UserContext>
 </>
  
)
