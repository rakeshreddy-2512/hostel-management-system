import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import PatientsPage from './pages/PatientsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorDashboard from './pages/DoctorDashboard';
import BillingPage from './pages/BillingPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to='/patients' />} />
            <Route path='patients' element={<PatientsPage />} />
            <Route path='appointments' element={<AppointmentsPage />} />
            <Route path='doctor' element={<DoctorDashboard />} />
            <Route path='billing' element={<BillingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
