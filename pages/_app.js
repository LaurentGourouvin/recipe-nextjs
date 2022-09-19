import tailwindCssStyle from "../styles/global.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="wrap-container grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
