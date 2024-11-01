"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div>
      {session ? (
        <>
          <div className="flex p-10 gap-10 w-full justify-center items-center">
            <div className="flex flex-col font-bold gap-5 mr-10">
              <h3 className=" text-2xl">Welcome, {user?.name}</h3>
              <h5 className="text-xl">Email : {user?.email}</h5>
              <button
                onClick={() => signOut()}
                className="w-full md:w-auto bg-slate-100 text-black"
                variant="outline"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className=" flex  items-center flex-col">
          <h2 className="text-2xl mt-2 mb-4">Please login </h2>
          <h3 className=" text-2xl">Welcome, {user?.name}</h3>
        </div>
      )}
    </div>
  );
}
