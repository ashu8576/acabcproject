import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HomeForm from '../components/HomeForm';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/product-details');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Header />
      {/*<HomeForm />*/}
      <HomeForm />
    </div>
  );
};

export default HomePage;