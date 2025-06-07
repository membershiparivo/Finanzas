import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Expenses from './pages/Expenses';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/expenses" 
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          } 
        />
        
        {/* Placeholder routes - these would be implemented as needed */}
        <Route path="/debts" element={<ProtectedRoute><div>Debts Page</div></ProtectedRoute>} />
        <Route path="/income" element={<ProtectedRoute><div>Income Page</div></ProtectedRoute>} />
        <Route path="/future" element={<ProtectedRoute><div>Future Page</div></ProtectedRoute>} />
        <Route path="/savings" element={<ProtectedRoute><div>Savings Page</div></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><div>Summary Page</div></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;