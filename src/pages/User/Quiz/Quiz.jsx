import React, { useState } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";

export default function Quiz() {
  const [showCorrectModal, setShowCorrectModal] = useState(false); // 정답 모달 상태
  const [showIncorrectModal, setShowIncorrectModal] = useState(false); // 오답 모달 상태

  const handleCorrect = () => {
    setShowCorrectModal(true); // 정답 시 모달 띄우기
  };

  const handleIncorrect = () => {
    setShowIncorrectModal(true); // 오답 시 모달 띄우기
  };

  const closeModal = () => {
    setShowCorrectModal(false); // 모달 닫기
    setShowIncorrectModal(false); // 오답 모달 닫기
  };

  return (
    <div className="min-h-screen bg-[#F28079]">
      <UserTitle />
      <div className="flex w-full">
        <UserNav />
        <div className="flex flex-col mr-10 w-full rounded-[40px] bg-[#fafafa] shadow-xl h-[850px] px-12 py-9 overflow-y-auto">
          <img
            src="/assets/images/review/OXTitle.png"
            alt="OX 타이틀"
            className="w-[150px] m-3"
          />
        </div>
      </div>
    </div>
  );
}
