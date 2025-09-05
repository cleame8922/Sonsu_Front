import React, { useState } from 'react'
import AdminTitle from '../../../components/AdminTitle';
import AdminNav from '../../../components/AdminNav';

const colors = [
"#DEE6F1",
"#F2F3ED",
"#F1E3D8",
"#F4EBCE",
"#DEE8D0",
"#F0E4F8",
"#D9D9D9",
];

export default function AdminGroupAdd() {

const [selectedColor, setSelectedColor] = useState("");

  return (
    <div className='min-h-screen bg-[#5A9CD0]'>
      <AdminTitle/>
      
      <div className='flex w-full'>
        <AdminNav />

        <div className='flex mr-10 w-full justify-center rounded-3xl bg-[#fafafa] h-[950px]'>
          <div className='flex flex-col w-[80%] justify-center'>
            <div className='flex text-[23px] text-[#333] fontSB'>그룹 생성하기</div>
            
            <div className='flex justify-center'>
              <div className='flex flex-col justify-center w-[55%]'>
                <div className='flex justify-end text-red-500 text-[13px] fontMedium mt-12'>
                  필수 *
                </div>
                
                <div className='flex text-[18px] text-[#333] fontMedium items-center'>
                  그룹 이름
                  <span className='ml-1 text-red-500'>*</span>
                </div>
                <input
                  type="text"
                  placeholder="손수잇다"
                  className="bg-transparent px-4 py-3 mt-5 border-[1.5px] border-[#555552] rounded-xl focus:outline-none focus:border-[#5A9CD0]"
                />

                <div className='flex text-[18px] text-[#333] fontMedium mt-14 items-center'>
                  부가 설명
                </div>
                <input
                  type="text"
                  placeholder="안녕하세요~"
                  className="bg-transparent px-4 py-3 mt-5 border-[1.5px] border-[#555552] rounded-xl focus:outline-none focus:border-[#5A9CD0]"
                />

                <div className='flex text-[18px] text-[#333] fontMedium mt-14 items-center'>
                  그룹 색상
                  <span className='ml-1 text-red-500'>*</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 mt-5">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-[40px] h-[40px] rounded-full cursor-pointer`}
                      style={{
                        backgroundColor: color,
                        border: selectedColor === color ? "3px solid #5A9CD0" : "none",
                      }}
                    />
                  ))}
                </div>

                <div className='flex items-center mt-14'>
                  <div className='flex text-[18px] text-[#333] fontMedium'>
                    그룹 코드
                  </div>
                  <div className='flex ml-8 text-[#666]'>그룹 코드는 그룹 생성 후 자동으로 생성됩니다.</div>
                </div>
              </div>
            </div>

            <div className='flex justify-end mt-12'>
              <div className='flex text-[20px] text-[#555552] fontSB'>취소</div>
              <div className='flex text-[20px] ml-5 text-[#5A9CD0] fontSB'>만들기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
