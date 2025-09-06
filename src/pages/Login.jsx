import React, { useState, useEffect, useCallback, memo } from "react";

// 최적화 1: 반복되는 입력 필드를 위한 재사용 컴포넌트
// React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지합니다.
const FormField = memo(
  ({ id, type, placeholder, value, onChange, message, isValid }) => (
    <div className="w-full">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="bg-gray-100 shadow-inner w-full p-3 my-1 rounded-full border-none"
        value={value}
        onChange={onChange}
      />
      <p
        className={`message text-xs h-4 px-2 ${
          isValid ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </p>
    </div>
  )
);

// 최적화 2: 폼의 공통 구조를 위한 컴포넌트
const AuthForm = ({ title, onSubmit, children }) => (
  <form
    onSubmit={onSubmit}
    className="w-full h-full flex flex-col justify-center px-20 text-center bg-white"
  >
    <h1 className="font-bold text-4xl mb-4 text-[#333333]">{title}</h1>
    {children}
  </form>
);

// 오버레이 패널 컴포넌트 (디자인/기능 변경 없음)
const OverlayPanel = ({ title, buttonText, onClick, alignment }) => (
  <div
    className={`absolute top-0 h-full w-1/2 flex flex-col items-center justify-center text-center px-10 transition-transform duration-700 ease-in-out ${alignment}`}
  >
    <div className="flex items-center justify-center mb-5">
      <img
        src="assets/images/logo.png"
        alt="손수잇다 로고"
        className="w-20 h-20 mr-5"
      />
      <h1 className="font-bold text-3xl text-[#333333]">손수잇다</h1>
    </div>
    <p className="font-medium text-lg text-[#333333] mt-8">
      수어를 쉽고, 재미있게!
    </p>
    <div className="mt-8 text-[#4F4F4F] text-base leading-relaxed">
      <p>손수잇다는</p>
      <p>3D 아바타의 수어 동작 애니메이션 게임과</p>
      <p>같은 재미 요소를 활용하여</p>
      <p>비장애인이 보다 쉽고 재미있게</p>
      <p>학습 할 수 있도록 돕는 서비스 입니다.</p>
    </div>
    <p className="font-medium mt-12 mb-3 text-[#333333]">{title}</p>
    <button
      onClick={onClick}
      className="bg-[#333333] text-[#FFE694] font-bold py-3 px-12 rounded-full transition-transform duration-100 ease-in active:scale-95"
    >
      {buttonText}
    </button>
  </div>
);

const FONT_STYLES = `
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-Regular.woff2') format('woff2'),
         url('/assets/fonts/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/Pretendard-Bold.woff2') format('woff2'),
         url('/assets/fonts/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-display: swap;
  }
  .pretendard-font * {
    font-family: 'Pretendard', sans-serif !important;
  }
`;

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // 최적화 3: 여러 state를 하나의 객체로 통합 관리
  const [form, setForm] = useState({
    id: { value: "", message: "", isValid: false },
    pw: { value: "", message: "", isValid: false },
    pwConfirm: { value: "", message: "", isValid: false },
    email: { value: "", message: "", isValid: false },
    phone: { value: "", message: "", isValid: false },
  });

  const [isFormValid, setIsFormValid] = useState(true);

  // 최적화 4: useCallback으로 불필요한 함수 재생성 방지
  const validateField = useCallback(
    (name, value) => {
      let isValid = false;
      let message = "";

      switch (name) {
        case "id":
          const idRegex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;
          isValid = idRegex.test(value);
          message = isValid
            ? "사용 가능한 아이디 입니다."
            : "ID를 영문, 숫자 포함 6자 이상 입력해주세요";
          break;
        case "pw":
          const pwRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
          isValid = pwRegex.test(value);
          message = isValid
            ? "사용 가능한 비밀번호 입니다."
            : "PW를 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.";
          break;
        case "pwConfirm":
          isValid = value === form.pw.value && value.length > 0;
          message = isValid
            ? "비밀번호가 일치합니다."
            : "비밀번호가 일치하지 않습니다.";
          break;
        case "email":
          const emailRegex =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
          isValid = emailRegex.test(value);
          message = isValid
            ? "사용 가능한 이메일 입니다."
            : "이메일 형식이 올바르지 않습니다.";
          break;
        case "phone":
          const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
          isValid = phoneRegex.test(value);
          message = isValid
            ? "사용 가능한 번호입니다."
            : "올바른 형식이 아닙니다.";
          break;
        default:
          break;
      }
      return { isValid, message };
    },
    [form.pw.value]
  ); // pwConfirm 검사를 위해 form.pw.value를 의존성으로 추가

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const { isValid, message } = validateField(name, value);
      setForm((prevForm) => ({
        ...prevForm,
        [name]: { value, message, isValid },
        // 비밀번호가 변경되면 비밀번호 확인 필드도 다시 검사
        ...(name === "pw" && {
          pwConfirm: {
            ...prevForm.pwConfirm,
            ...validateField("pwConfirm", prevForm.pwConfirm.value),
          },
        }),
      }));
    },
    [validateField]
  );

  useEffect(() => {
    const allValid = Object.values(form).every((field) => field.isValid);
    setIsFormValid(!allValid);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="relative w-[1280px] h-[720px] bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Sign-Up Form Container */}
        <div
          className={`absolute top-0 h-full left-0 w-1/2 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-100 z-[50]"
              : "opacity-0 z-[10] pointer-events-none"
          }`}
        >
          <AuthForm title="SIGN UP" onSubmit={handleSubmit}>
            <FormField
              id="id"
              type="text"
              placeholder="아이디"
              {...form.id}
              onChange={handleChange}
            />
            <FormField
              id="pw"
              type="password"
              placeholder="비밀번호"
              {...form.pw}
              onChange={handleChange}
            />
            <FormField
              id="pwConfirm"
              type="password"
              placeholder="비밀번호 확인"
              {...form.pwConfirm}
              onChange={handleChange}
            />
            <FormField
              id="email"
              type="email"
              placeholder="이메일"
              {...form.email}
              onChange={handleChange}
            />
            <FormField
              id="phone"
              type="text"
              placeholder="전화번호"
              {...form.phone}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={isFormValid}
              className="bg-[#FFE694] text-[#333333] font-bold py-3 px-16 rounded-full mt-4 transition-transform duration-100 ease-in active:scale-95 disabled:bg-gray-300"
            >
              회원가입
            </button>
          </AuthForm>
        </div>

        {/* Sign-In Form Container */}
        <div
          className={`absolute top-0 h-full left-0 w-1/2 transition-all duration-700 ease-in-out z-[20] ${
            isSignUp ? "translate-x-full" : ""
          }`}
        >
          <AuthForm title="SIGN IN" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="아이디"
              className="bg-gray-100 shadow-inner w-full p-3 my-2 rounded-full border-none"
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="bg-gray-100 shadow-inner w-full p-3 my-2 rounded-full border-none"
            />
            <button
              type="submit"
              className="bg-[#FFE694] text-[#333333] font-bold py-3 px-16 rounded-full mt-6 transition-transform duration-100 ease-in active:scale-95"
            >
              로그인
            </button>
          </AuthForm>
        </div>

        {/* Overlay Container (애니메이션 로직/디자인 변경 없음) */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-[100] ${
            isSignUp ? "-translate-x-full" : ""
          }`}
        >
          <div
            className={`relative -left-full h-full w-[200%] bg-[#FFE694] transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <OverlayPanel
              title="이미 회원이라면?"
              buttonText="로그인"
              onClick={() => setIsSignUp(false)}
              alignment={`transform transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            />
            <OverlayPanel
              title="아직 회원이 아니라면?"
              buttonText="회원가입"
              onClick={() => setIsSignUp(true)}
              alignment={`right-0 transform transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-[20%]" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
