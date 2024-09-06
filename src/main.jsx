import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FTC from "./components/FTC.jsx";
import SPC from "./components/SPC.jsx";
import { fetchFTC } from "./components/FTC.jsx";
import Home from "./components/Home.jsx";
import { fetchSPC } from "./components/SPC.jsx";
import UserFTC from "./components/UserFTC.jsx";
import Form from "./components/Form.jsx";
import Loader from "./components/Loader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/ftc/:caseNo/:caseName",
    element: (
      <Suspense
        fallback={
          <div className="h-screen w-screen flex justify-center it">
            <Loader />
          </div>
        }
      >
        <FTC />
      </Suspense>
    ),
    loader: fetchFTC,
  },

  {
    path: "/addSpc/:caseNo/:caseName",
    element: <SPC />,
    loader: fetchSPC,
  },
  {
    path: "/addFtc/:caseNo/:caseName",
    element: <UserFTC />,
  },
  {
    path: "/add",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
