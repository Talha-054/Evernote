import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Layout from "./components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  const [analytics, setAnalytics] = useState(false);
  const [ftcStatus, setFtcStatus] = useState(false);
  const [spcStatus, setSpcStatus] = useState(false);
  const [taskStatus, setTaskStatus] = useState(true);
  const [adminTableStatus, setAdminTableStatus] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState();
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        toast.warn("Sign In to access the page");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    });
  }, []);

  return (
    <>
      {login && (
        <section
          style={{}}
          className="w-screen h-screen  lg:p-7 lg:py-14 shadow-lg shadow-blue-500  bg-[#E5E5E5] overflow-auto "
        >
          <div className="w-full h-full flex border-[1px] border-black/10 p-1">
            <Sidebar
              toggleStatus={setAnalytics}
              setFtcStatus={setFtcStatus}
              setSpcStatus={setSpcStatus}
              setTaskStatus={setTaskStatus}
              setUpdatedStatus={setUpdatedStatus}
              setAdminTableStatus={setAdminTableStatus}
            />
            {/* <Table /> */}
            <Layout
              showStatus={analytics}
              ftcStatus={ftcStatus}
              spcStatus={spcStatus}
              adminTableStatus={adminTableStatus}
              setAdminTableStatus={setAdminTableStatus}
              setFtcStatus={setFtcStatus}
              setSpcStatus={setSpcStatus}
              taskStatus={taskStatus}
              setTaskStatus={setTaskStatus}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
            />
          </div>
        </section>
      )}

      <div className="absolute bg-black/10 h-screen w-screen">
        <ToastContainer
          role="alert"
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="light"
          transition:Bounce
          limit={1}
        />
      </div>
    </>
  );
}

export default App;
