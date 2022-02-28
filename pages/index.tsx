import type { NextPage } from "next";

const Home: NextPage = () => {
  // 4.7 강의 5분 46초
  return (
    <form className="flex flex-col space-y-2  p-5">
      <input
        type="text"
        required
        placeholder="Username"
        className="required:bg-yellow-500 invalid:bg-gray-300 rounded p-1 peer"      />
    <span className="hidden peer-invalid:text-red-500 peer-invalid:block">This input is invalid</span>
    <span className="hidden peer-valid:text-teal-500 peer-valid:block">This input is valid</span>
    <span className="hidden peer-hover:text-orange-500 peer-hover:block">Hover!</span>
      <input type="submit" value="Login" className="bg-white" />
    </form>
  );
};

export default Home;
