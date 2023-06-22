import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const ScrollRestoration = ({ children }) => {
    const router = useRouter();
  
    useEffect(() => {
      const handleRouteChange = () => {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
      };
  
      router.events.on('routeChangeComplete', handleRouteChange);
  
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);
  
    return children;
  };
  