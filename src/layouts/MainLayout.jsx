import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const MainLayout = () => {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="custom-toast"
      />
    </>
  );
};

export default MainLayout;
