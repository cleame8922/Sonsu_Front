import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminTitle from "../../../components/AdminTitle";
import AdminNav from "../../../components/AdminNav";
import SonsuCard from "./SonsuCard";
import CustomCard from "./CustomCard";

export default function Curri_Part() {
  const { code } = useParams();
  const { state } = useLocation();
  const name = state?.name;
  // const desc = state?.desc;

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />
      <div className="flex w-full">
        <AdminNav />
        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[850px] px-10 py-8">
          <div>
            <p className="font-semibold text-[25px]">{name}</p>
            <div className="flex justify-between items-center">
              <div className="text-[20px] font-semibold text-[#777]">
                #{code}
              </div>
              <button className="bg-[#5A9CD0] text-white text-[18px] rounded-full px-4 py-1 font-semibold">
                수정완료
              </button>
            </div>
          </div>

          <div className="flex w-full justify-evenly mt-8">
            {/* SONSU */}
            <SonsuCard />

            {/* 커스텀 */}
            <CustomCard />
          </div>
        </div>
      </div>
    </div>
  );
}
