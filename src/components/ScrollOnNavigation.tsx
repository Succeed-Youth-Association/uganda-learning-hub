// src/components/ScrollOnNavigation.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollOnNavigation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollOnNavigation;