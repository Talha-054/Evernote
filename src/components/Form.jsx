import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { addAdmin, updateLastLogin } from "../firebase/auth";
import LoadingBar from "react-top-loading-bar";

const schema = yup.object({
  username: yup.string().matches(/^[a-zA-Z0-9]{4,}$/, {
    message: "username must contain atleat 4 characters",
  }),
  email: yup
    .string()
    .required()
    .matches(/^[a-zA-Z][a-zA-Z0-9\._\-]{2,}@[a-zA-Z]{2,}\.[a-z]{2,}$/, {
      message: "Invalid email format",
    }),
  password: yup
    .string()
    // .matches(/^[a-zA-Z0-9]{6,}$/, {
    //   message: "Password must be atleast 6 charatcters",
    // })
    .min(6, "Password must be atleast 6 charatcters")
    .required(),
  conPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match"),
});

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const {
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const loaderRef = useRef(null);

  useEffect(() => {
    console.log("reddddddd");
    schema?.isValid().then((res) => console.log(res));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setLoading(false);
        updateLastLogin(user.uid);
        setPersistence;
        navigate("/home");
      } else {
        setLoading(false);
        navigate("/");
      }
    });
  }, []);

  const submit = async (data) => {
    loaderRef.current.continuousStart(30, 500);
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let time = hr + ":" + min + ":" + sec;
    let timeStamp = date.toISOString().split("T")[0] + " " + time;
    console.log(timeStamp);

    try {
      let user = {
        email: data.email,
        id: "",
        username: data.username || "",
        lastLogin: timeStamp,
      };

      if (isLogin) {
        let res = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        loaderRef.current.complete();

        console.log(res);
        let uid = res.user.uid;
        updateLastLogin(uid);
        navigate("/home");
      } else {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        loaderRef.current.complete();
        user.id = res.user.uid;
        user.username = usernameRef.current.value;
        addAdmin(user);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      setError("login", {
        type: "custom",
        message: "invalid email OR password",
      });
      loaderRef.current.complete();
    }
  };

  function handleIsLogin() {
    reset();
    setIsLogin((prev) => !prev);
  }

  return (
    <>
      <LoadingBar
        loaderSpeed={500}
        color="#f11946"
        height={4}
        ref={loaderRef}
      />
      <div className="flex items-center relative justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {!isLogin && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username:
                </label>
                <input
                  {...register("username")}
                  id="username"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm`}
                />
                <p className=" my-2 px-2 text-red-500 text-xs   ">
                  {errors.username?.message}
                </p>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                {...register("email")}
                id="email"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm`}
              />
              <p className=" my-2 px-2 text-red-500 text-xs   ">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                {...register("password")}
                id="password"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none   sm:text-sm`}
              />
              <p className=" my-2 px-2 text-red-500 text-xs  ">
                {errors.password?.message}
              </p>
            </div>
            {!isLogin && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password:
                </label>
                <input
                  {...register("conPassword")}
                  id="password"
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none   sm:text-sm`}
                />
                <p className=" my-2 px-2 text-red-500 text-xs  ">
                  {errors.conPassword?.message}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 te py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none text-white "
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            {
              <p className=" my-2 px-2 text-red-500 text-xs text-center ">
                {errors.login?.message}
              </p>
            }
          </form>
          <button
            onClick={handleIsLogin}
            className="mt-4 text-xs w-full text-indigo-600 hover:text-indigo-700"
          >
            {isLogin ? "Create an account" : "Already have an account"}
          </button>
        </div>
        {loading && (
          <div className="flex justify-center absolute h-screen w-screen bg-black/20 backdrop-blur-3xl items-center py-2">
            <Loader />
          </div>
        )}
        {}
      </div>
    </>
  );
};

export default Form;

// export const verifyUser = () => {
//   try {
//   } catch (error) {
//     console.log(error.message);
//     return null;
//   }
// };
