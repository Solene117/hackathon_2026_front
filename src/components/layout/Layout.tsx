import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import RecordingMiniWidget from "../activities/RecordingMiniWidget";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-200/60 lg:bg-app-bg">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-app-bg lg:max-w-3xl lg:shadow-none xl:max-w-4xl">
        <RecordingMiniWidget />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
