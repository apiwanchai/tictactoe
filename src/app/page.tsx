"use client"; 
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();

  useEffect(() => {
   
    router.push("/game");
  }, [router]); 

  return (
    <>
      <div className="flex flex-col gap-5">
        <p>Hello gamer</p>
        <p>Redirecting to the game page...</p> 
      </div>
    </>
  );
}
