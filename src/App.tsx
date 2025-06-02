import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { AuthProvider } from './context/AuthContext';
import { FormDataProvider } from './context/FormDataContext';

function App() {
  return (
    <AuthProvider>
      <FormDataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/details" element={<DetailsPage />} />
              <Route path="/product-details" element={<ProductDetailsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </FormDataProvider>
    </AuthProvider>
  );
}

export default App;