import { TriangleAlert } from "lucide-react";

import { PlayButton } from "./play-button";
import { FeaturedGridSkeleton } from "@/components/skeletons/featured-grid-skeleton";

import { useMusicStore } from "@/store/use-music-store";

export const FeaturedSection = () => {
    const { isLoading, featuredSongs, error } = useMusicStore();

    if(isLoading) return <FeaturedGridSkeleton/>

    if(error) return (
        <div className="flex gap-2 items-center justify-center">
            <TriangleAlert className="size-5 stroke-3"/>
            <span className="text-md inline cursor-default">Failed to load</span>
        </div>
    )

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featuredSongs.map((song) => (
                <div
                  key={song._id}
                  className="flex items-center bg-[#20356c]/50 border-3 border-[#0f0e32] rounded-md overflow-hidden hover:bg-[#20356c]/30 transition-colors hover:translate-0.5 group cursor-pointer relative">
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="size-16 sm:size-20 object-cover flex-shrink-0 border-r-3 border-[#0f0e32]"/>
                    <div className="flex-1 p-4">
                        <p className="text-base font-medium truncate">{song.title}</p>
                        <p className="text-sm truncate text-[#a2c4e1]/50">{song.artist}</p>
                    </div>
                    <PlayButton song={song}/>
                </div>
            ))}
        </div>
    );
};