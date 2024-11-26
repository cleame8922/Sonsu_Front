export default function MyPage() {
  const userData = {
    name: "이호연",
    email: "dlghdus9949@sungkyul.ac.kr",
    profilePicture: "/images/hoyeon.png",
    region: "성결대학교",
    time: "06:23:22",
    ranking: [
      {
        name: "최유정",
        region: "멋사 운영진",
        time: "21:12:05",
        percentage: 100,
      },
      {
        name: "공준석",
        region: "성결대 학생회",
        time: "19:25:13",
        percentage: 90,
      },
      {
        name: "장원석",
        region: "3학년 과대",
        time: "09:47:01",
        percentage: 50,
      },
      { name: "김정이", region: "교수님", time: "08:33:42", percentage: 40 },
      { name: "호랑이", region: "어흥", time: "07:52:20", percentage: 35 },
    ],
    activityRank: 20,
    likes: 11,
    comments: 27,
    totalActions: 38,
    attendanceMissions: [1, 5, 10, 20, 30], // 출석 미션 (단계별 미션)
    consecutiveDays: 5,
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 bg-gradient-to-b from-[#fffdef]">
      <div className="container mx-auto px-4 w-[1000px]">
        {/* User Profile */}
        <div className="flex items-center bg-white p-6 rounded-lg shadow-md mb-6">
          <img
            src={userData.profilePicture}
            alt="프로필"
            className="w-32 h-32 rounded-full mr-6"
          />
          <div className="flex w-full justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
              <p className="text-gray-600">{userData.region}</p>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-gray-600">{userData.tier}</p>
            </div>
            <div className="flex items-center mr-6">
              <button className="px-4 py-2 w-32 h-12 text-xl font-semibold text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-400">
                수정하기
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 학습 랭킹 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">학습 랭킹</h3>
            <ul>
              {userData.ranking.map((user, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-none"
                >
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-yellow-500 mr-4">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-4">{user.time}</p>
                    <div className="w-40 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-yellow-500 h-4 rounded-full"
                        style={{ width: `${user.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 활동 랭크 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">활동 랭크</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="transparent"
                    stroke="gray"
                    strokeWidth="40"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="transparent"
                    stroke="orange"
                    strokeWidth="40"
                    strokeDasharray="900"
                    strokeDashoffset={`${
                      900 - (900 * userData.activityRank) / 100
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl font-extrabold text-yellow-500">
                    상위 {userData.activityRank}%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center align-center justify-center">
              <ul className="mt-12 text-gray-700 font-semibold text-xl">
                <li>수강 시간: {userData.time}</li>
                <li>수강 시간: {userData.time}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 출석 미션 트로피 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-8 h-[230px]">
          <h3 className="text-2xl font-bold mb-8 ">출석 트로피</h3>
          <div className="flex items-center justify-around">
            {userData.attendanceMissions.map((mission, index) => (
              <div
                key={index}
                className="relative w-16 h-16 flex flex-col items-center justify-center rounded-full border-2"
              >
                {/* 동그라미 부분: 트로피 이미지가 표시됨 */}
                <div
                  className={`absolute w-20 h-20 flex items-center justify-center rounded-full ${
                    mission <= userData.consecutiveDays
                      ? "bg-yellow-200 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {mission <= userData.consecutiveDays && (
                    <img
                      src="/images/trophy.png"
                      alt="트로피"
                      className="absolute top-1/2 left-1/2 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 "
                    />
                  )}
                </div>

                {/* 출석 번호와 텍스트: 동그라미 밑으로 위치 */}
                <div className="flex flex-col mt-28">
                  <span className="font-semibold text-[14px]">
                    {mission}번 출석
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
