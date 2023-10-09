import React from 'react';
import HomeTabs from './HomeTabs';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
  
    if(location && location.state) {
      navigate(location.state.from.pathname);
      return null;
    }
  
    return (
      <div className="home">
        <HomeTabs />
      </div>
    );
}

export default Home;