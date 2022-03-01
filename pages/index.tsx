import type { NextPage } from "next";

const Home: NextPage = () => {
  // 4.7 강의 5분 46초
  return (
    <div className="flex flex-col space-y-2 p-5">
      <input
        type="file"
        className="transition-colors file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-400 file:px-5 file:text-white file:hover:bg-purple-700"
      />
      {/* modifier는 중첩이 가능하다! file:hover:options */}
    </div>
  );
};

export default Home;
