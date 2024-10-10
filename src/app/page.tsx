"use client"; // เพื่อให้คอมโพเนนต์นี้เป็น Client Component
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // ใช้ useRouter จาก next/navigation

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ทำการ redirect ไปยังหน้า /game
    router.push("/game");
  }, [router]); // เพิ่ม router ใน dependency array

  return (
    <>
      <div className="flex flex-col gap-5">
        <p>Hello gamer</p>
        <p>Redirecting to the game page...</p> {/* แสดงข้อความระหว่างการ redirect */}
      </div>
    </>
  );
}
