import React from 'react'

export default function Login() {
  return (
    <div className='flex min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#FFF7E2]'>
      {/* 왼쪽 로그인 폼 */}
      <div className='z-10 flex justify-center flex-1 w-full mx-auto'>
        <div className='flex flex-col justify-center'>
          <div className='flex text-[60px] font-medium'>LOGIN</div>
          
          <div className='flex flex-col mt-10 w-[400px]'>
            <div className='mr-2'>Username or email address</div>
            <div className='mt-2'>
              <input type="text" className='bg-[#FFFFFF] p-3 w-full rounded-2xl shadow-xl' placeholder="아이디를 입력해주세요." />
            </div>
          </div>

          <div className='flex flex-col mt-10 w-[400px]'>
            <div className='mr-2'>Password</div>
            <div className='mt-2'>
              <input type="text" className='bg-[#FFFFFF] p-3 w-full rounded-2xl shadow-xl' placeholder="비밀번호를 입력해주세요." />
            </div>
          </div>

          <div className='flex justify-between w-[400px] mt-10'>
            <button className='flex bg-[#FBE8A6] px-16 py-3 rounded-2xl shadow-xl'>로그인</button>
            <button className='flex bg-[#FBE8A6] px-16 py-3 rounded-2xl shadow-xl'>회원가입</button>
          </div>
        </div>
      </div>

     {/* 오른쪽 이미지 */}
      <div className='flex flex-col items-end justify-end flex-1 overflow-visible'>
        <img src="/images/loginimg.png" alt="원" className='w-[1000px] max-w-none h-auto' />
      </div>
    </div>
  )
}
