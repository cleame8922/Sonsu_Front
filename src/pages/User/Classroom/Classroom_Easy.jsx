import React from "react";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";

export default function Classroom_Easy() {
  return (
    <div className="min-h-screen bg-[#FFE694]">
      <UserTitle />
      <div className="flex w-full">
        <UserNav />

        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] shadow-xl h-[850px]"></div>
      </div>
    </div>
  );
}
