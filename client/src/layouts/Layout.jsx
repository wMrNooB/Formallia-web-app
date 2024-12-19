import { Outlet } from "react-router-dom";
import Navbar from '../components/NavBar';
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollUp";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
    <ScrollToTop />
    <Navbar/>
    <ToastContainer
  position="top-right"
  style={{
    top: '110px',
  }}
  autoClose={2000}
  theme="colored"
  hideProgressBar={false}
  closeButton={false}
/>

    <Outlet />
    <Footer />
    </>
  );
}

export default Layout;