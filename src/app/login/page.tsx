"use client";
import { signIn } from "next-auth/react";
import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div className="text-center mb-2">Login with OAuth</div>
      <div className="flex flex-col bg-gray-900 rounded-md max-w-[300px] p-5 gap-2 mx-auto">
        <button
          type="button" // เปลี่ยนเป็น type="button" แทน type="submit"
          className="p-2 bg-blue-700 w-[60%] mx-auto rounded-md hover:bg-blue-800"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/game",
            })
          }
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm; // ส่งออกเป็น default
