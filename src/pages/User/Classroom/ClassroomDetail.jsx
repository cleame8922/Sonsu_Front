import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import { API_URL } from "../../../config";
import { FiLock } from "react-icons/fi";

export default function ClassroomDetail() {
  const { level, partId } = useParams();
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const [progress, setProgress] = useState([]);

  // 레벨별 배경색
  const levelBgColor = {
    easy: "#D7EDD5",
    normal: "#CBD3DF",
    hard: "#ECD7D4",
  };

  useEffect(() => {
    // 해당 파트의 step 불러오기
    const fetchSteps = async () => {
      try {
        const res = await axios.get(`${API_URL}/lessons/${partId}/topics`, {
          withCredentials: true,
        });
        setSteps(res.data);
      } catch (err) {
        console.error("Step 불러오기 실패:", err);
      }
    };

    // 유저 진도 불러오기
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${API_URL}/progress/topics`, {
          withCredentials: true,
        });
        setProgress(res.data || []);
      } catch (err) {
        console.error("진도 불러오기 실패:", err);
      }
    };

    fetchSteps();
    fetchProgress();
  }, [partId]);

  const isLocked = (index) => index > progress.length;

  const handleStepClick = (step) => {
    if (!isLocked(step.step_number - 1)) {
      navigate(`/study/${step.lesson_id}`, { state: { step } });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE694]">
      <UserTitle />
      <div className="flex w-full">
        <UserNav />
        <div className="flex flex-col mr-10 w-full rounded-[40px] bg-[#fafafa] shadow-xl h-[850px] px-12 py-9 overflow-y-auto">
          <div className="mb-6">
            <p className="text-[#222] font-bold text-[25px]">손수잇다</p>
            <p className="text-[#777] font-semibold text-[20px]">#12345</p>
          </div>

          <div
            className={`px-10 py-8 rounded-[40px] h-[85%] overflow-y-auto`}
            style={{ backgroundColor: levelBgColor[level] }}
          >
            <div className="grid grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.lesson_id}
                  className={`flex p-4 rounded-[20px] ${
                    isLocked ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() => handleStepClick(step)}
                >
                  <div className="relative p-4 rounded-[15px] shadow-lg bg-[#F2F2F2]">
                    <img
                      src="/assets/images/Sign.png"
                      alt=""
                      className="w-20 h-20"
                    />
                    {isLocked(index) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-[15px]">
                        <FiLock className="text-white" size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center ml-4">
                    <p className="font-bold text-lg">
                      Step {step.step_number}. {step.word}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
