import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ChallengeProvider } from './contexts/ChallengeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChallengeProvider>
          <App />
        </ChallengeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);