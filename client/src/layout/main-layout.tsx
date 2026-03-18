import { Outlet } from "react-router-dom";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { LeftSidebar } from "./components/left-sidebar";
import { AudioPlayer } from "./components/audio-player";
import { PlaybackControls } from "./components/playback-controls";

const MainLayout = () => {
    return (
        <div className="h-screen bg-[#003480] text-white font-chango flex flex-col">
            <ResizablePanelGroup orientation="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
                <AudioPlayer/>
                <ResizablePanel defaultSize={23}>
                    <LeftSidebar/>
                </ResizablePanel>
                <ResizableHandle className="w-2 bg-[#003480] rounded-lg transition-colors"/>
                <ResizablePanel defaultSize={77}>
                    <Outlet/>
                </ResizablePanel>
            </ResizablePanelGroup>
            <PlaybackControls/>
        </div>
    );
};

export default MainLayout;