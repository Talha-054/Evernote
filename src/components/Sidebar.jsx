import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Sidebar({
  toggleStatus,
  setSpcStatus,
  setFtcStatus,
  setTaskStatus,
  setUpdatedStatus,
  setAdminTableStatus,
}) {
  const navigate = useNavigate();

  function viewRecords() {
    toggleStatus(false);
    setTaskStatus(true);
    setFtcStatus(false);
    setSpcStatus(false);
    setUpdatedStatus(false);
    setAdminTableStatus(false);
  }

  function viewAnalytics() {
    toggleStatus(true);
    setTaskStatus(false);
    setSpcStatus(false);
    setAdminTableStatus(false);
    setUpdatedStatus(false);
    setFtcStatus(false);
  }

  function showFtc() {
    toggleStatus(false);
    setTaskStatus(false);
    setSpcStatus(false);
    setFtcStatus(true);
    setUpdatedStatus(false);
    setAdminTableStatus(false);
  }

  function showSpc() {
    toggleStatus(false);
    setTaskStatus(false);
    setFtcStatus(false);
    setSpcStatus(true);
    setUpdatedStatus(false);
    setAdminTableStatus(false);
  }

  function viewAdmins() {
    toggleStatus(false);
    setTaskStatus(false);
    setFtcStatus(false);
    setSpcStatus(false);
    setUpdatedStatus(false);
    console.log("admin show");

    setAdminTableStatus(true);
  }

  async function SignOut() {
    console.log("clicked");
    await signOut(auth);
    navigate("/");
  }

  return (
    <>
      <section className=" w-[230px]  h-full hidden lg:flex flex-col justify-between items-start py-8  bg-[#FFFFFF] ">
        <div className="w-full flex justify-start items-center my-4 mb-12 px-7">
          <h1 className="text-[#013CC6] text-2xl font-bold">Admin</h1>
        </div>

        <div className="w-full grow flex flex-col justify-start items-center gap-6 ">
          <h1 className="text-[#013CC6] text-sm flex justify-center items-center hover:cursor-pointer">
            <span className="text-lg">❖</span> Dashboard
          </h1>

          <h1
            onClick={viewRecords}
            className="opacity-60 hover:cursor-pointer hover:scale-110 duration-300 text-sm  "
          >
            {" "}
            <span className="px-1">圓</span>Records
          </h1>
          <h1
            onClick={viewAdmins}
            className="opacity-60 pl-2 hover:cursor-pointer hover:scale-110 duration-300 text-sm "
          >
            {" "}
            <span className="">🙎🏻‍♂️</span> Admins
          </h1>
          <h1
            onClick={showFtc}
            className="opacity-60  hover:cursor-pointer hover:scale-110 duration-300 text-sm  "
          >
            <span className="pr-1 text-lg">✉</span>
            ftc
          </h1>
          <h1
            onClick={showSpc}
            className="opacity-60 hover:cursor-pointer hover:scale-110 duration-300 text-sm  "
          >
            <span className="pr-2 text-xl">✉</span>
            spc
          </h1>
          <h1 className="opacity-60 hover:cursor-pointer hover:scale-110 duration-300 text-sm  ">
            <span className="pr-1 text-md">⚙️</span>settings
          </h1>
          <h1
            onClick={viewAnalytics}
            className="opacity-60 hover:cursor-pointer hover:scale-110 duration-300 text-sm  "
          >
            {" "}
            <span className="">📊</span> Analytics
          </h1>
        </div>

        <div className="grow  w-full flex flex-col justify-center text-black/40 text-md gap-4 items-center py-2 px-2">
          <span className="hover:cursor-pointer hover:scale-125 duration-500">
            Help <span className=" text-sm">❓</span>
          </span>

          <button
            onClick={SignOut}
            className="bg-indigo-500 hover:bg-indigo-600 rounded-full px-4 py-2 text-white "
          >
            Sign Out
          </button>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
