import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const headerStyles = {
    background: '#fff',
    padding: '16px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyles = {
    fontSize: '24px',
    fontWeight: 600,
    color: '#2563eb',
    margin: 0,
  };

  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'background-color 0.2s',
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const handleSuccessfulLogin = () => {
    setIsLoginModalOpen(false);
    navigate('/product-details');
  };

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <h1 style={titleStyles}>FormFlow</h1>
        
        <button
          onClick={isAuthenticated ? handleLogoutClick : handleLoginClick}
          style={buttonStyles}
        >
          <LogIn size={16} />
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>

      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
          onSuccess={handleSuccessfulLogin}
        />
      )}
    </header>
  );
};

export default Header;