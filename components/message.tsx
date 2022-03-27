import { cls } from "@libs/client/utils";
import Image from "next/image";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatar?: string;
}

export default function Message({ message, avatar, reversed }: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start",
        reversed ? " flex-row-reverse space-x-2 space-x-reverse" : "space-x-2"
      )}
    >
      <div className="relative h-8 w-8 rounded-full bg-slate-400">
        <Image
          layout="fill"
          src={`https://imagedelivery.net/Jbn0son-X4aW02A0_gVqgA/${avatar}/avatar`}
          className="h-12 w-12 items-center rounded-full bg-slate-400 "
        />
      </div>

      <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        <p>{message}</p>
      </div>
    </div>
  );
}
