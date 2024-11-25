import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { FaArrowRightLong } from "react-icons/fa6";

export default function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();
  //   const { login } = useContext(AuthContext);

  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;

    if (regex.test(e.target.value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,}$/;

    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  useEffect(() => {
    if (idValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid]);

  //   const handleLogin = async () => {
  //     try {
  //       const response = await axios.post(`${API_URL}/user/login`, {
  //         id: id,
  //         password: pw,
  //       });

  //       if (response.status === 200) {
  //         // 로그인 성공 시 서버에서 받은 토큰과 사용자 데이터 저장
  //         const { token, username } = response.data;
  //         // console.log('로그인 성공:', token, username);

  //         login(token, username); // 토큰과 사용자 데이터 모두 저장
  //         alert("로그인에 성공했습니다.");
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         alert("아이디 또는 비밀번호 오류");
  //       } else {
  //         alert("서버 오류 발생");
  //       }
  //     }
  //   };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mt-7 w-[60%] p-2 mb-8 ">
        <span className="text-[30px] font-semibold">
          아이디와 비밀번호를
          <br />
          입력해주세요
        </span>
        <form className="inputbox mt-7">
          <div className="idbox flex flex-col">
            <span className="id text-base ml-1">ID</span>
            <input
              type="text"
              value={id}
              onChange={handleId}
              className="idinput border mt-1 p-3 rounded-lg"
              placeholder="test1234"
            />
            {!idValid && id.length > 0 && (
              <div className="text-xs text-red-500 mt-2 ml-2">
                영문, 숫자 포함 6자 이상 입력해주세요
              </div>
            )}
          </div>
          <div className="pwbox flex flex-col mt-5">
            <span className="pw text-base ml-1">PW</span>
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              className="pwinput border mt-1 p-3 rounded-lg"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            />
            {!pwValid && pw.length > 0 && (
              <div className="text-xs text-red-500 mt-2 ml-2">
                영문, 숫자, 특수문자 포함 8자 이상 입력해주세요
              </div>
            )}
          </div>
        </form>
        <button
          // onClick={handleLogin}
          disabled={notAllow}
          className="
                submit border mt-10 w-[100%] h-14 rounded-full bg-yellow-500 text-white 
                disabled:bg-[#dadada] disabled:text-white
                "
        >
          로그인
        </button>
        <div className="flex justify-center mt-4">
          <span className="mr-2">계정이 없으신가요?</span>
          <Link
            to="/SignUp"
            className="flex flex-row justify-center items-center font-extrabold"
          >
            계정 만들러 가기
            {/* <FaArrowRightLong className="ml-2" /> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
