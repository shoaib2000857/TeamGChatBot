"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [isLoadding, setIsLoadding] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const postUserData = async (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const UserSignup = async (event) => {
    try {
      event.preventDefault();
      setIsLoadding(true);
      setError(null);
      const result = await axios.post("/api/signup", userData);

      if (result.data.success === false) throw new Error(result.data.message);

      await signIn("credentials", {
        redirect: true,
        callbackUrl: "/profile",
        email: userData.email,
        password: userData.password,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadding(false);
      setUserData({
        email: "",
        password: "",
        name: "",
      });
    }
  };

  return (
    <div className="flex  items-center justify-center w-full h-screen ">
      <div className="flex flex-col items-center justify-center bg-blue-400 p-10 rounded-lg">
        <h2 className="text-4xl font-bold">Signup Page</h2>
        <form className="text-black flex flex-col gap-5 ">
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}

          <label htmlFor="email">Name :</label>
          <input
            type="text"
            name="name"
            className="p-2 rounded"
            readOnly={isLoadding}
            placeholder="Please Enter your Name"
            onChange={postUserData}
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            className="p-2 rounded"
            readOnly={isLoadding}
            placeholder="Please Enter Email"
            onChange={postUserData}
          />
          <label className="" htmlFor="password">
            Password :
          </label>
          <input
            type="password"
            name="password"
            className="p-2 rounded"
            placeholder="Please Enter Password"
            readOnly={isLoadding}
            onChange={postUserData}
          />
          <button
            className="bg-black text-white p-2 rounded hover:bg-slate-900"
            disabled={isLoadding}
            onClick={UserSignup}
          >
            {isLoadding ? "Loading..." : "Signup"}
          </button>
        </form>

        <Link
          className="mt-5 hover:underline-offset-4 hover:text-blue-800"
          href="/login"
        >
          Go to login page
        </Link>
      </div>
    </div>
  );
}
