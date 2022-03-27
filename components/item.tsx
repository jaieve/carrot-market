import { cls } from "@libs/client/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface ItemProps {
  title: string;
  id: number;
  price: number;
  image: string;
  comments: number | null;
  hearts: number;
}

export default function Item({
  title,
  price,
  image,
  comments,
  hearts,
  id,
}: ItemProps) {
  // 관심목록 페이지라면 하트 크기, 위치 수정
  const { pathname } = useRouter();
  const isFavsPage = pathname.includes("/loved");
  // 하트 클릭시 관심목록에서 제거

  return isFavsPage ? (
    <Link href={`/products/${id}`}>
      <a className="flex cursor-pointer justify-between px-4 pt-5">
        <div className="flex space-x-4">
          <div className="object-fit relative h-20 w-20 rounded-md bg-gray-400">
            <Image
              layout="fill"
              className="rounded-md  shadow-sm"
              src={`https://imagedelivery.net/Jbn0son-X4aW02A0_gVqgA/${image}/public`}
            />
          </div>
          <div className="flex flex-col pt-2">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="mt-1 font-medium text-gray-900">
              ￦{price.toLocaleString("ko-KR")}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-end space-x-2">
          <div
            className={cls(
              "flex items-center space-x-0.5 text-sm",
              hearts > 0 ? "text-red-600" : "text-gray-600"
            )}
          >
            {hearts > 0 ? (
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            )}

            <span className="text-gray-600">{hearts}</span>
          </div>
          {comments ? (
            <div className="flex items-center space-x-0.5 text-sm text-gray-600">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>{comments}</span>
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  ) : (
    <Link href={`/products/${id}`}>
      <a className="flex cursor-pointer justify-between px-4 pt-5">
        <div className="flex space-x-4">
          <div className="relative h-20 w-20 rounded-md bg-gray-400">
            <Image
              layout="fill"
              className="rounded-md shadow-sm"
              src={`https://imagedelivery.net/Jbn0son-X4aW02A0_gVqgA/${image}/avatar`}
            />
          </div>
          <div className="flex flex-col pt-2">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="mt-1 font-medium text-gray-900">
              ￦{price.toLocaleString("ko-KR")}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-end space-x-2">
          <div
            className={cls(
              "flex items-center space-x-0.5 text-sm",
              hearts > 0 ? "text-red-600" : "text-gray-600"
            )}
          >
            {hearts > 0 ? (
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            )}

            <span className="text-gray-600">{hearts}</span>
          </div>
          {comments ? (
            <div className="flex items-center space-x-0.5 text-sm text-gray-600">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>{comments}</span>
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
}
