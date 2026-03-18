import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, LibraryBig } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PlaylistSkeleton } from "@/components/skeletons/playlist-skeleton";

import { useMusicStore } from "@/store/use-music-store";

export const LeftSidebar = () => {
    const { albums, fetchAlbums, isLoading } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    return (
        <div className="h-full flex flex-col gap-2">
            <div className="relative bg-[#b4dafb] border-4 border-[#0f0e32] rounded-xl p-5">
                <div className="absolute top-2 left-2 size-3 rounded-full border-2 border-[#0f0e32] bg-[#67beff]"/>
                <div className="absolute top-2 right-2 size-3 rounded-full border-2 border-[#0f0e32] bg-[#67beff]"/>
                <div className="absolute bottom-2 left-2 size-3 rounded-full border-2 border-[#0f0e32] bg-[#67beff]"/>
                <div className="absolute bottom-2 right-2 size-3 rounded-full border-2 border-[#0f0e32] bg-[#67beff]"/>
                <div className="space-y-2">
                    <Link
                        to={"/"}
                        className={cn(buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-center text-lg text-[#0f0e32] hover:bg-[#b4dafb] hover:scale-106"
                        }))}>
                            <HomeIcon className="mr-1 stroke-3 size-6"/>
                            <span className="text-md hidden md:inline">Home</span>
                    </Link>
                </div>
            </div>
            <div className="flex-1 rounded-xl border-4 border-[#0f0e32] outline-dashed outline-[#0f0e32]/50 -outline-offset-10 bg-[#67beff] p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-[#0f0e32] px-2">
                        <LibraryBig className="size-5 stroke-3 mr-2"/>
                        <span className="hidden md:inline hover:cursor-default">Your library</span>
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading
                         ? <PlaylistSkeleton/>
                         : (
                            albums.map((album) => (
                                <Link
                                    to={`/albums/${album._id}`}
                                    key={album._id}
                                    className="p-2 bg-[#147d9b]/70 hover:bg-[#147d9b]/90 hover:translate-0.5 border-3 border-[#0f0e32] rounded-md flex items-center gap-3 group cursor-pointer mx-0.5">
                                        <div className="size-2 rounded-full border-2 border-[#0f0e32] bg-[#0078f0]"/>
                                        <img
                                            src={album.imageUrl}
                                            alt="Albums"
                                            className="size-12 rounded-md border-3 border-[#0f0e32] flex-shrink-0 object-cover"/>
                                        <div className="flex-1 min-w-0 hidden md:block">
                                            <p className="font-medium text-sm text-[#0f0e32]/90 truncate">{album.title}</p>
                                            <p className="text-xs text-[#0f0e32]/60 truncate">Album • {album.artist}</p>
                                        </div>
                                </Link>
                            ))
                         )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};