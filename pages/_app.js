import { useEffect } from "react";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";

const ScrollRestoration = ({ children }) => {
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

function App({ Component, pageProps }) {
  return (
    <ScrollRestoration>
      <Component {...pageProps} />
    </ScrollRestoration>
  );
}

export default App;