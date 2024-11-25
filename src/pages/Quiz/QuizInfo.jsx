import React from 'react'
import { CgShapeCircle } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

export default function QuizInfo() {
    return (
        <div>
            <div className='flex justify-center h-screen items-centers bg-gradient-to-b from-[#fffdef]'>
                <div className="flex w-[100%]">
                    <div className="flex justify-center items-center w-[100%]">
                        <img src="/images/report.png" alt="report" className='flex w-[350px]' />
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex w-fit text-center font-bold text-[40px]'>화면에 나타나는 수어 동작과 해당 수어가 맞는지 확인하고</div>
                            <div className='flex w-fit text-center font-bold text-[40px]'>수어가 맞다면 <div className='ml-2 text-[red]'>O</div>를 틀리다면 <div className='ml-2 text-[red]'>X</div>를 눌러주세요.</div>
                            <div className='flex justify-between w-[500px] mt-11'>
                                <CgShapeCircle className='size-[170px] text-[red]'/>
                                <IoClose className='size-[180px] text-[red]' />
                            </div>
                            <NavLink to='/Quiz' className="mt-11 px-10 py-3 text-[20px] font-bold text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-400">
                                다음
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
