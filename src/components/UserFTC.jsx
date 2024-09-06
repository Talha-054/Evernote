import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import {
  getFTC,
  getSPC,
  storeFTC,
  storePSPC,
  storeSPC,
  storeTask,
} from "../firebase/auth2.js";
import { createPSPC } from "../Utils/pspc.js";
import { createTask } from "../Utils/task.js";
import Loader from "./Loader";
import LoadingBar from "react-top-loading-bar";
// import { useDispatch, useSelector } from "react-redux";
// import { updateFTC } from "../slices/userSlice";

function UserFTC() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const ftcData = useLoaderData();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const params = useParams();
  const caseNo = params.caseNo;
  const caseName = params.caseName;

  const mostRecentConferenceRef = useRef();
  const monthsSinceMostRecentConferenceRef = useRef();
  const mostRecentConferenceTypeRef = useRef();
  const conferenceScheduledDateRef = useRef();
  const scheduledConferenceTypeRef = useRef();
  const closingConferenceRef = useRef();

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!ftcData) return;

    // dispatch(updateFTC(ftcData));

    mostRecentConferenceRef.current.value = ftcData?.mostRecentConference;
    monthsSinceMostRecentConferenceRef.current.value =
      ftcData?.monthsSinceMostRecentConference;
    mostRecentConferenceTypeRef.current.value =
      ftcData?.mostRecentConferenceType;
    conferenceScheduledDateRef.current.value = ftcData?.conferenceScheduledDate;
    scheduledConferenceTypeRef.current.value = ftcData?.scheduledConferenceType;
    closingConferenceRef.current.value = ftcData?.closingConference;

    return () => {
      setLoading(false);
    };
  }, []);

  async function handleNext(e) {
    e.preventDefault();

    const mostRecentConference = mostRecentConferenceRef.current.value.trim();
    const monthsSinceMostRecentConference =
      monthsSinceMostRecentConferenceRef.current.value.trim();
    const mostRecentConferenceType =
      mostRecentConferenceTypeRef.current.value.trim();
    const conferenceScheduledDate =
      conferenceScheduledDateRef.current.value.trim();
    const scheduledConferenceType =
      scheduledConferenceTypeRef.current.value.trim();
    const closingConference = closingConferenceRef.current.value.trim();

    if (!mostRecentConference || !conferenceScheduledDate) {
      setError(true);
      setErrorMsg("Required field empty");
      return;
    }

    const userFtcData = {
      caseNo: caseNo,
      caseName: caseName,
      mostRecentConference: mostRecentConference,
      monthsSinceMostRecentConference: monthsSinceMostRecentConference,
      mostRecentConferenceType: mostRecentConferenceType,
      conferenceScheduledDate: conferenceScheduledDate,
      scheduledConferenceType: scheduledConferenceType,
      closingConference: closingConference,
    };

    setLoading(true);
    loaderRef.current.continuousStart(30, 1000);

    const userData = {
      caseNo: caseNo,
      caseName: caseName,
    };

    try {
      let ftcData = userFtcData ? userFtcData : await getFTC(userData);
      await storeFTC(userFtcData);
      navigate(`/addSpc/${caseNo}/${caseName}`);
    } catch (error) {
      console.log(
        "some error occured while submitting ftc form. error is: ",
        error
      );
      setError(true);
      setLoading(false);
      loaderRef.current.complete();
      setErrorMsg(error.message + " | " + "unable to Submit form!");
    }
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
              FTC FORM
            </h1>
            <div className="w-full flex flex-col h-full justify-evenly">
              <input
                ref={mostRecentConferenceRef}
                onBlur={(e) => (e.target.type = "text")}
                onFocus={(e) => {
                  e.target.type = "date";
                  setError(false);
                }}
                placeholder="Most Recent Conference"
                type="text"
                className={`w-full bg-white/10 rounded-full px-3 border-white py-4 ${
                  error ? "border-[1px]" : null
                } focus:outline-white/20  text-white text-lg font-medium`}
              />
              <input
                ref={monthsSinceMostRecentConferenceRef}
                placeholder="Months Since Most Recent Conference"
                type="text"
                className="w-full bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium"
              />
              <input
                ref={mostRecentConferenceTypeRef}
                placeholder="Most Recent Conference Type"
                type="text"
                className="w-full bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium"
              />
              <input
                ref={conferenceScheduledDateRef}
                onBlur={(e) => (e.target.type = "text")}
                onFocus={(e) => {
                  e.target.type = "date";
                  setError(false);
                }}
                placeholder="Conference Scheduled Date"
                type="text"
                className={`w-full bg-white/10 border-white rounded-full px-3 py-4 ${
                  error ? "border-[1px]" : null
                } focus:outline-white/20 text-white text-lg font-medium`}
              />
              <input
                ref={scheduledConferenceTypeRef}
                placeholder="Scheduled Conference Type"
                type="text"
                className="w-full bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium"
              />
              <input
                ref={closingConferenceRef}
                placeholder="Closing Conference"
                type="text"
                className="w-full bg-white/10 rounded-full px-3 py-4 focus:outline-white/20 text-white text-lg font-medium"
              />

              <div
                onClick={handleNext}
                className="w-full flex justify-end items-center pr-2"
              >
                {!loading && (
                  <button className="px-6 text-xl py-2 rounded-full bg-black/60 text-white hover:cursor-pointer hover:bg-black/90">
                    Save
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

export default UserFTC;

export const fetchFTC = async ({ params }) => {
  const caseName = params.caseName;
  const caseNo = params.caseNo;

  const userData = {
    caseNo: caseNo,
    caseName: caseName,
  };

  const ftcData = await getFTC(userData);
  return ftcData || null;
};
