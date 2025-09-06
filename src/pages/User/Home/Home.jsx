import React from "react";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import DailyCheckIn from "./DailyCheckIn";
import ContinueLearning from "./ContinueLearning";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#D2D2D2]">
      <UserTitle />

      <div className="flex w-full">
        <UserNav />

        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[850px]">
          <div className="flex h-full flex items-center">
            {/* 왼 */}
            <div className="w-[50%] flex flex-col items-center justify-center">
              <img
                src="/assets/images/sonsu.png"
                alt=""
                className="w-[220px]"
              />
              <p className="text-[32px] fontMedium mt-12">안녕하세요, OOO님!</p>
            </div>
            <div className="w-[1px] h-[500px] bg-[#D9D9D9] "></div>
            {/* 오 */}
            <div className="w-[50%] h-[500px] flex flex-col ml-32 justify-between">
              {/* 출석 */}
              <DailyCheckIn />
              {/* 이어서학습하기 */}
              <ContinueLearning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
