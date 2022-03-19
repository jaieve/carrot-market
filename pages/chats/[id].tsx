import type { NextPage } from "next";
import Layout from "../../components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 px-4 py-10">
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-400" />
          <div className="w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700">
            <p>Hi how much are you selling them for?</p>
          </div>
        </div>

        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-slate-400" />
          <div className="w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700">
            <p> I want ￦20,000</p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-400" />
          <div className="w-1/2 rounded-md border border-gray-400 p-2 text-sm text-gray-700">
            <p>미쳤어</p>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-4 left-0 right-0 mx-auto w-full max-w-md">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-300 focus:ring-purple-500"
            />

            <div className="absolute inset-y-0 right-0  flex py-1.5 pr-1.5">
              <button
                className=" flex items-center rounded-full bg-purple-500 px-3 text-sm font-semibold
            text-white focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
