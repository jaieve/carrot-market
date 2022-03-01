import type { NextPage } from "next";

const Home: NextPage = () => {
  // 4.7 강의 5분 46초
  return (
    <div className="flex flex-col space-y-2 p-5">
      <p className="first-line:hover:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
        molestiae exercitationem nam dolore accusantium quae dicta excepturi
        cupiditate, impedit corrupti ipsa officia maiores inventore aliquam?
        Consectetur quisquam illo in a.
      </p>
      <p className="first-letter:text-4xl">Hello Everybody</p>
    </div>
  );
};

export default Home;
