import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="mx-auto flex h-screen max-w-[430px] flex-col border-x border-neutral-700 bg-white">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
}