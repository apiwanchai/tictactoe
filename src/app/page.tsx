import React from "react";
import { LoginForm } from "./login/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-5 ">
        <LoginForm></LoginForm>
      </div>
    </>
  );
}
