import React, { useRef, useState, useEffect } from "react";
import Img from "../assets/home.jpg";
import { createUser, addVisitor } from "../firebase/auth2";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

function Home() {
  const months = [
    { 0: "January" },
    { 1: "Feburary" },
    { 2: "March" },
    { 3: "April" },
    { 4: "May" },
    { 5: "June" },
    { 6: "July" },
    { 7: "August" },
    { 8: "September" },
    { 9: "October" },
    { 10: "November" },
    { 11: "December" },
  ];

  const navigate = useNavigate();

  const caseNoRef = useRef();
  const caseNameRef = useRef();
  const errorRef = useRef();

  const [caseNoValid, setCaseNoValid] = useState(false);
  const [caseNameValid, setCaseNameValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(true);
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [login, setLogin] = useState(false);

  const loaderRef = useRef(null);

  useEffect(() => {
    console.log("fired");
    addVisitor();

    return () => {
      setLoading(false);
      setModal(false);
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
        setModal(false);
        navigate("/add");
      } else {
        setLoading(true);

        toast.warn("Sign In to access the page");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  }, []);

  function isCaseNoValid() {
    caseNoRef.current.value.trim().length == 6
      ? setCaseNoValid(true)
      : setCaseNoValid(false);
  }

  function isCaseNameValid() {
    caseNameRef.current.value.trim().length >= 3
      ? setCaseNameValid(true)
      : setCaseNameValid(false);
  }

  async function handleSubmit(e) {
    loaderRef.current.continuousStart(30, 500);
    setError(false);
    e.preventDefault();
    console.log(isCaseNoValid);
    if (!caseNameValid || !caseNoValid) {
      loaderRef.current.complete();
      setError(true);
      setErrorMsg("caseNo length =  6, caseName atleast 3");
      return;
    }
    let caseNo = caseNoRef.current.value.trim();
    let caseName = caseNameRef.current.value.trim();

    let createdAt = new Date();
    createdAt.setHours(0, 0, 0, 0);
    let month = months[createdAt.getMonth()][createdAt.getMonth()];
    createdAt = createdAt.toISOString().split("T")[0];
    console.log(month);

    let creds = {
      caseNo: caseNo,
      caseName: caseName,
      createdAt: createdAt,
      month: month,
    };

    try {
      setLoading(true);
      let res = await createUser(creds);
      !res &&
        (() => {
          setLoading(false);
          loaderRef.current.complete();
        })();

      !res && setError(true);
      res ? navigate(`/addFtc/${caseNo}/${caseName}`) : null;
    } catch (error) {
      setLoading(false);
      loaderRef.current.complete();
      setError(true);
      setErrorMsg(error.message || "something went wrong");
      console.log(
        "some error occured while adding/registering user. Error is:  ",
        error
      );
    }
  }

  function goBack() {
    console.log("clicked");
    navigate("/home");
  }

  return (
    <>
      <LoadingBar
        color="#f11946"
        ref={loaderRef}
        loaderSpeed={1000}
        height={4}
      />
      {login && (
        <section className="h-screen w-screen p-2 relative flex flex-col justify-start items-center overflow-hidden lg:flex-row-reverse lg:justify-evenly">
          {modal && (
            <div className="flex justify-center  absolute top-0 h-full w-full bg-black/20 backdrop-blur-3xl items-center py-2 z-50">
              <Loader />
            </div>
          )}
          <div
            onClick={goBack}
            className="absolute top-5 z-[100] left-5 hover:cursor-pointer hover:scale-125 duration-300 "
          >
            <span className="text-xl ">◀</span>
          </div>
          <img
            src={Img}
            alt=""
            className="max-w-[500px] max-h-[350px] z-10 shadow-inner shadow-black lg:rounded-full "
          />
          <div className="flex flex-col justify-start items-center ">
            <h1 className="text-4xl pt-16 lg:pt-0">
              Welcome to{" "}
              <span className="text-green-500 text-4xl">MyPlans</span>
            </h1>
            <p className="text-lg text-black/50 py-2">
              Making every plan via smoother process
            </p>
            <form action="#" className="lg:mt-14 mt-20  flex flex-col">
              <label className="text-md text-black/70 mb-1" htmlFor="">
                CASE NO:
              </label>
              <input
                onChange={isCaseNoValid}
                ref={caseNoRef}
                type="text"
                placeholder=""
                className={`w-[330px] border-2 border-black/50 outline-1 px-2 py-2 rounded-md ${
                  caseNoValid ? "outline-green-500" : "outline-red-500"
                }`}
              />

              <label className="text-md text-black/70 mb-1 mt-8" htmlFor="">
                CASE NAME:
              </label>
              <input
                onChange={isCaseNameValid}
                ref={caseNameRef}
                type="text"
                placeholder=""
                className={`w-[330px] border-2 border-black/50 px-2 py-2 rounded-md ${
                  caseNameValid ? "outline-green-500" : "outline-red-500"
                }`}
              />

              <div className="w-full flex justify-center items-center mt-8">
                {!loading && (
                  <button
                    onClick={handleSubmit}
                    className="px-4 w-[82px] py-2 rounded-full bg-green-400 hover:cursor-pointer hover:bg-green-500 duration-300 text-white text-xl"
                  >
                    Add
                  </button>
                )}
                {loading && <Loader />}
              </div>
              <div className="flex justify-end"></div>
              {error && (
                <div className="mt-4">
                  <p
                    ref={errorRef}
                    className="px-4 overflow-hidden text-center py-2 w-[330px] rounded-full bg-red-500 text-white"
                  >
                    {errorMsg}
                  </p>
                </div>
              )}
            </form>
          </div>

          <div className="absolute hidden lg:inline h-[180vh] w-[20vw] homeImg2 bg-cover bg-center right-[-5%] rotate-[320deg] opacity-70 hover:opacity-100 duration-300 shadow-inner shadow-black/10"></div>
        </section>
      )}
      {!login && (
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
        />
      )}
    </>
  );
}

export default Home;
