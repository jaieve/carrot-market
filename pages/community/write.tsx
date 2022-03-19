import type { NextPage } from "next";
import Layout from "../../components/layout";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="글 작성">
      <form className="px-4 py-10">
        <textarea
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 "
          rows={4}
          placeholder="Ask a question!"
        />
        <button className="mt-2 w-full rounded-md border border-transparent bg-purple-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Write;
