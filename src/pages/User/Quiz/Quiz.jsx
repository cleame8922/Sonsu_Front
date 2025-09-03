import React, { useState } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

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
        <div>
            <div className="flex justify-center h-screen items-center bg-gradient-to-b from-[#fffdef] relative">
                <div className="flex w-[100%]">
                    <div className="flex flex-col justify-center items-center w-[100%]">
                        <div className="flex w-fit text-center font-bold text-[50px]">
                            안녕하세요 / 안녕히계세요
                        </div>
                        <img
                            src="/images/hoyeon_hi.png"
                            alt="hoyeon_hi"
                            className="w-[450px]"
                        />
                        <div className="flex justify-between w-[500px] mt-11">
                            {/* 정답 아이콘 */}
                            <CgShapeCircle
                                className="cursor-pointer text-[red] text-[170px]"
                                onClick={handleCorrect}
                            />
                            {/* 오답 아이콘 */}
                            <IoClose
                                className="cursor-pointer text-[red] text-[180px]"
                                onClick={handleIncorrect}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 정답 모달 */}
            {showCorrectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-center bg-white rounded-lg p-9">
                        <h2 className="mb-4 text-2xl text-red-500">정답입니다~!!</h2>
                        <div className="flex m-[60px]">
                            <img src="/images/correct.png" alt="correct" className="w-[250px]" />
                        </div>
                        <button
                            onClick={closeModal}
                            className="px-6 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-400"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}

            {/* 오답 모달 */}
            {showIncorrectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-8 text-center bg-white rounded-lg">
                        <h2 className="mb-4 text-2xl text-red-500">오답입니다!</h2>
                        <div className="flex m-9">
                            <img src="/images/incorrect.png" alt="incorrect" className="w-[200px]" />
                            <div className="flex items-center font-bold text-[20px] text-[#222] p-5">
                                여기에는 오답해설을 적을건가요?
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="px-6 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-400"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
