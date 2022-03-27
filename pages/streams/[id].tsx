import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Stream, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}
interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}
interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages[];
}
interface MessageForm {
  message: string;
}

const LineDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const { register, handleSubmit, reset } = useForm();
  // POST
  const [snedMessage, { data: sendMessageData, loading }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );

  const onValid = (form: MessageForm) => {
    if (!form) return;
    reset();
    mutate(
      (prev) =>
        prev && {
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        },
      false
    ); // 백엔드로 보내기전 실행할 함수. 함수를 쓰면 1st param : 캐시의 모든 이전 데이터
    //snedMessage(form); // 백엔드로 POST 요청을 보내는 함수
  };

  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10  px-4">
        <iframe
          src={`https://iframe.videodelivery.net/${data?.stream.cloudflareId}`}
          className="aspect-video w-full rounded-md shadow-sm"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen={true}
        ></iframe>
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">
            ${data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
          <div className="flex flex-col space-y-3 overflow-scroll rounded-md bg-purple-300 p-5">
            <span>Stream Keys(secret)</span>
            <span className="font-medium text-gray-600">
              <span className="text-gray-800">URL: </span>
              {data?.stream.cloudflareUrl}
            </span>
            <span className="font-medium text-gray-600">
              <span className="text-gray-800">KEY: </span>
              {data?.stream.cloudflareKey}
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16">
            {data?.stream?.messages?.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed inset-x-0 bottom-0  bg-white py-2">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative mx-auto flex w-full  max-w-md items-center"
            >
              <input
                {...register("message", { required: true })}
                type="text"
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-purple-500 px-3 text-sm text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LineDetail;
