import { cls } from "../libs/utils";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  return (
    <div>
      <div className="top-0flex fixed w-full items-center border-b bg-white py-3 text-center text-lg font-medium text-purple-900">
        {title ? <span>{title}</span> : null}
      </div>
      <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className="fixed bottom-0 flex items-center justify-between border-t bg-white pb-10 pt-3 text-gray-800"></nav>
      ) : null}
    </div>
  );
}
