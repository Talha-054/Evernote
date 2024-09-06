import React from "react";
import profileImg from "../assets/header.jpg";
import App from "../App";
import { useState } from "react";

function Header({ data }) {
  const {
    setRefresh,
    tasks,
    ftc,
    spc,
    updated,
    setUpdated,
    taskStatus,
    ftcStatus,
    spcStatus,
    updatedStatus,
    setUpdatedStatus,
    setFtcStatus,
    setSpcStatus,
    setTaskStatus,
    adminTableStatus,
  } = data;

  const [track, setTrack] = useState();

  function handleSearch(e) {
    let inputLength = e.target.value.length;
    let inputVal = e.target.value || null;
    console.log(inputLength);

    if (taskStatus) {
      setTrack("tasks");
      if (inputLength < 0) setUpdated(tasks);
      let filtered = tasks.filter((record) => {
        return record.caseNo.slice(0, inputLength) == inputVal;
      });
      console.log(filtered);
      setUpdated([...filtered]);
      setTaskStatus(false);
      setUpdatedStatus(true);
    }

    if (ftcStatus) {
      setTrack("ftc");
      let filtered = ftc.filter((record) => {
        return record.caseNo.slice(0, inputLength) == inputVal;
      });
      console.log(filtered);
      setUpdated([...filtered]);
      setFtcStatus(false);
      setUpdatedStatus(true);
    }

    if (spcStatus) {
      setTrack("spc");
      let filtered = spc.filter((record) => {
        return record.caseNo.slice(0, inputLength) == inputVal;
      });
      console.log(filtered);
      setUpdated([...filtered]);
      setSpcStatus(false);
      setUpdatedStatus(true);
    }

    if (updatedStatus) {
      let arr;
      track == "tasks" ? (arr = tasks) : console.log("nthing");
      track == "ftc" ? (arr = ftc) : console.log("nthing");
      track == "spc" ? (arr = spc) : console.log("nthing");
      let filtered = arr.filter((record) => {
        return record.caseNo.slice(0, inputLength) == inputVal;
      });
      console.log(arr);
      console.log(filtered);
      setUpdated([...filtered]);

      if (inputLength < 1) {
        console.log(inputLength);
        track == "tasks" ? setUpdated(tasks) : console.log("nthing");
        track == "ftc" ? setUpdated(ftc) : console.log("nthing");
        track == "spc" ? setUpdated(spc) : console.log("nthing");
      }
    }

    //     if (updatedStatus) {
    //       let filtered = updated.filter((record) => {
    //         return record.caseNo.slice(0, inputLength) == inputVal;
    //       });
    //       console.log(filtered);
    //       setUpdated([...filtered]);
    //     }
  }

  function refreshPage() {
    setRefresh((prev) => !prev);
  }

  return (
    <>
      <section className="w-full flex justify-between items-center">
        <div className="search-bar">
          {!adminTableStatus && (
            <div className="search bg-white border-[1px] border-black/10">
              <span className="text-xl font-light px-2  text-black/20">🔍</span>
              <input
                onChange={handleSearch}
                placeholder="Search Case No"
                type="text"
                className="max-w-[350px] min-w-[200px] px-2 py-1 outline-1 placeholder-black/30 focus:outline-black/20 "
              />
            </div>
          )}
        </div>

        <div className="profile  flex gap-3 items-center lg:items-end justify-center">
          <div
            onClick={refreshPage}
            className="relative h-8 w-8 bg-white flex justify-center items-center hover:cursor-pointer"
          >
            <span className=" text-black/20 bg-white hover:text-black/50 duration-300 font-black text-2xl ">
              ⟳
            </span>
          </div>

          <div className="relative h-8 w-8 bg-white flex justify-center items-center hover:cursor-pointer">
            <span className="text-md text-black/20 bg-white hover:text-black/50 duration-300 ">
              🔔
            </span>
            <div className="h-2 w-2 rounded-full bg-orange-300 absolute top-[-5px] right-[-3px]"></div>
          </div>

          <img src={profileImg} alt="" className="h-10 w-12" />
        </div>
      </section>
    </>
  );
}

export default Header;
