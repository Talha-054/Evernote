import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updateSPC } from "../slices/userSlice";

// import { useSelector } from "react-redux";
import {
  getFTC,
  getSPC,
  storePSPC,
  storeSPC,
  storeTask,
} from "../firebase/auth2";
import { createTask } from "../Utils/task";
import { createPSPC } from "../Utils/pspc";
import Loader from "./Loader";
import LoadingBar from "react-top-loading-bar";

function SPC() {
  const [loading, setLoading] = useState(false);

  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const caseNo = params.caseNo;
  const caseName = params.caseName;

  const spcData = useLoaderData();
  //   const userFtcData = useSelector((state) => state.user.ftc[0]);
  const referralDateRef = useRef();
  const lastSpcDateRef = useRef();
  const monthsSinceLastSpcRef = useRef();
  const nextDueDateRef = useRef();
  const dueStatusRef = useRef();
  const workerRef = useRef();

  const loaderRef = useRef(null);

  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (!spcData) return;

    // dispatch(updateSPC(spcData));

    referralDateRef.current.value = spcData.referralDate;
    lastSpcDateRef.current.value = spcData.lastSpcDate;
    monthsSinceLastSpcRef.current.value = spcData.monthsSinceLastSpc;
    nextDueDateRef.current.value = spcData.nextDueDate;
    dueStatusRef.current.value = spcData.dueStatus;
    workerRef.current.value = spcData.worker;

    return () => {
      setLoading(false);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const referralDate = referralDateRef.current.value.trim();
    const lastSpcDate = lastSpcDateRef.current.value.trim();
    const monthsSinceLastSpc = monthsSinceLastSpcRef.current.value.trim();
    const nextDueDate = nextDueDateRef.current.value.trim();
    const dueStatus = dueStatusRef.current.value.trim();
    const worker = workerRef.current.value.trim();

    if (!lastSpcDate || !referralDate || !nextDueDate) {
      setError(true);
      setErrorMsg("required field empty");
      return;
    }

    const userData = {
      caseNo: caseNo,
      caseName: caseName,
    };

    const userSpcData = {
      caseNo: caseNo,
      caseName: caseName,
      referralDate: referralDate,
      lastSpcDate: lastSpcDate,
      monthsSinceLastSpc: monthsSinceLastSpc,
      nextDueDate: nextDueDate,
      dueStatus: dueStatus,
      worker: worker,
    };

    // dispatch(updateSPC(userSpcData));

    try {
      setLoading(true);
      loaderRef.current.continuousStart(30, 1500);
      let ftcData = await getFTC(userData);
      const userPspcData = createPSPC(ftcData, userSpcData);
      const taskData = createTask(ftcData, userPspcData);
      await storeSPC(userSpcData);
      await storePSPC(userPspcData);
      await storeTask(taskData);
    } catch (error) {
      setError(true);
      setLoading(false);
      loaderRef.current.complete();
      setErrorMsg(error.message + " " + "Form not saved");
      console.log(
        "some error occured while submitting form. error is: ",
        error
      );
    }

    navigate("/");
  }

  return (
    <>
      <LoadingBar
        color="#f11946"
        ref={loaderRef}
        loaderSpeed={1000}
        height={4}
      />
      <section className="h-screen w-screen p-8 bg-gradient-to-r from-slate-500 to-slate-800 ">
        <div className="h-full w-full  flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg">
          <div className="xl:grow ftcImg bg-cover bg-center"></div>

          <div className="grow bg-white/10 backdrop-blur-sm  flex flex-col justify-start items-center py-4 px-4">
            <h1 className="text-4xl text-white border-b-2 border-white/50 mt-4 mb-16">
              SPC FORM
            </h1>
            <div className="w-full flex flex-col h-full justify-evenly">
              <input
                ref={referralDateRef}
                onBlur={(e) => (e.target.type = "text")}
                onFocus={(e) => {
                  e.target.type = "date";
                  setError(false);
                }}
                placeholder="Referral Date"
                type="text"
                className={`w-full border-white ${
                  error ? "border-[1px]" : null
                } bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium`}
              />
              <input
                ref={lastSpcDateRef}
                onBlur={(e) => (e.target.type = "text")}
                onFocus={(e) => {
                  e.target.type = "date";
                  setError(false);
                }}
                placeholder="Last SCP Date"
                type="text"
                className={`w-full bg-white/10 border-white ${
                  error ? "border-[1px]" : null
                } rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium`}
              />
              <input
                ref={monthsSinceLastSpcRef}
                placeholder="Months Since Last SCP"
                type="text"
                className="w-full bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium"
              />
              <input
                ref={nextDueDateRef}
                onBlur={(e) => (e.target.type = "text")}
                onFocus={(e) => {
                  e.target.type = "date";
                  setError(false);
                }}
                placeholder="Next Due Date"
                type="text"
                className={`w-full border-white ${
                  error ? "border-[1px]" : null
                } bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium`}
              />
              <input
                ref={dueStatusRef}
                placeholder="Due Status"
                type="text"
                className="w-full bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium"
              />
              <input
                ref={workerRef}
                placeholder="Worker"
                type="text"
                className="w-full bg-white/10 rounded-full px-3 py-4 focus:outline-white/20  text-white text-lg font-medium"
              />

              <div className="w-full flex justify-end items-center pr-2">
                {!loading && (
                  <button
                    onClick={handleSubmit}
                    className="px-6 text-xl py-2 rounded-full bg-black/60 text-white hover:cursor-pointer hover:bg-black/90"
                  >
                    submit →
                  </button>
                )}

                {loading && <Loader />}
              </div>
              <div>
                {error && (
                  <p className="bg-red-500 px-4 py-2 rounded-full text-center text-white">
                    {errorMsg}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SPC;

export const fetchSPC = async ({ params }) => {
  const caseName = params.caseName;
  const caseNo = params.caseNo;

  const userData = {
    caseNo: caseNo,
    caseName: caseName,
  };

  const spcData = await getSPC(userData);
  return spcData || null;
};
