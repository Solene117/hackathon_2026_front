import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-[430px] flex-col bg-app-bg">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
