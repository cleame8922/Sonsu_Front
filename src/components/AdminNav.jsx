import React from 'react'

export default function AdminNav() {
  return (
    <div className='flex w-[20%] mx-14 mt-3'>
      <div className='flex flex-col my-5'>
            <img
              src="/assets/images/Admin/Member/group.png"
              alt="group"
              className="flex my-5 w-[120px]"
            />

            <div className='flex my-5 text-[23px] text-[#333] fontBold'>수강 그룹 수정</div>

            <div className='flex my-5 text-[18px] text-[#333] fontBold'>수강 그룹 관리</div>

            <div className='flex my-5 text-[18px] text-[#333] fontBold'>수강 그룹 생성</div>
          </div>
    </div>
  )
}
