import React from "react";
import { useParams } from "react-router-dom";
import AdminNav from "../../../components/AdminNav";
import AdminTitle from "../../../components/AdminTitle";

export default function Curri_Part() {
  const { code } = useParams();
  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />

      <div className="flex w-full">
        <AdminNav />

        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[990px]">
          Part수정 {code}
        </div>
      </div>
    </div>
  );
}
