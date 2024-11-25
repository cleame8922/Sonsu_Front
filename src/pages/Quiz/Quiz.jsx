import React, { useState } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

export default function Quiz() {
    const [showAnimation, setShowAnimation] = useState(false); // 애니메이션 상태 추가

    const handleCorrect = () => {
        setShowAnimation(true); // 애니메이션 표시
        setTimeout(() => setShowAnimation(false), 2000); // 애니메이션 종료
    };

    const handleIncorrect = () => {
        alert("오답입니다!"); // 오답 처리
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

                {/* 애니메이션 아이콘 */}
                {showAnimation && (
                    <CgShapeCircle
                        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[red] text-[170px] animate-scale-up"
                    />
                )}
            </div>
        </div>
    );
}
