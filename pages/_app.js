import tailwindCssStyle from "../styles/global.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../redux/store/store.js";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="wrap-container grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </div>
    </Provider>
  );
}

export default MyApp;
