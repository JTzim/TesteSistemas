import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import TestCases from './pages/TestCases';
import TestPlans from './pages/TestPlans';
import UserManagement from './pages/UserManagement';
import Avaliacao from './pages/Avaliacao';
import CriterioAvaliacao from './pages/CriterioAvaliacao';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="test-cases" element={
              <ProtectedRoute>
                <TestCases />
              </ProtectedRoute>
            } />
            <Route path="test-plans" element={
              <ProtectedRoute>
                <TestPlans />
              </ProtectedRoute>
            } />
            <Route path="users" element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="avaliacao" element={
              <ProtectedRoute requiredRole="gestor">
                <Avaliacao />
              </ProtectedRoute>
            } />
            <Route path="criterio-avaliacao" element={
              <ProtectedRoute requiredRoles={['gestor', 'avaliador']}>
                <CriterioAvaliacao />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;