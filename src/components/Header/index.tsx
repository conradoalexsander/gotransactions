import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const [currentPath, setCurrentPath] = useState('');
  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <Container selectedPage={!!currentPath} size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/import">Importar</Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
