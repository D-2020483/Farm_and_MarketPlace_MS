import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserRegistraionForm from './components/forms/UserRegistrationForm.jsx';
import ClockWidget from './components/common/ClockWidget.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App />*/}
    <UserRegistraionForm />
    <ClockWidget />
  </StrictMode>,
)
