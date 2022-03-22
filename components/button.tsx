import { cls } from "../libs/client/utils";

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        "focus:ring-offet-2 w-full rounded-md border border-transparent bg-purple-500 px-4 font-medium text-white shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500",
        large ? "py-3 text-base" : "py-2 text-sm"
      )}
    >
      {text}
    </button>
  );
}
