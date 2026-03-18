import { Button } from "@/components/ui/button";

import { PlayButton } from "./play-button";
import { SectionGridSkeleton } from "./section-grid-skeleton";

import { type Song } from "@/types";

interface SectionGridProps {
    title: string;
    songs: Song[];
    isLoading: boolean;
};

export const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
    if(isLoading) {
        return (
            <SectionGridSkeleton/>
        );
    }

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
                <Button variant="link" className="text-sm text-zinc-400 hover:text-white hover:no-underline cursor-pointer">
                    Show all
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {songs.map((song) => (
                    <div
                        key={song._id}
                        className="bg-[#60baae]/50 border-3 border-[#0f0e32] p-4 rounded-md hover:bg-[#60baae]/40 cursor-pointer group hover:translate-0.5">
                            <div className="relative mb-4">
                                <div className="aspect-square rounded-md shadow-lg overflow-hidden border-3 border-[#0f0e32]">
                                    <img
                                        src={song.imageUrl}
                                        alt={song.title}
                                        className="w-full h-full object-cover"/>
                                </div>
                                <PlayButton song={song}/>
                            </div>
                        <h3 className="font-medium text-[#0f0e32]/90 mb-1 truncate">{song.title}</h3>
                        <p className="text-sm text-[#0f0e32]/60 truncate">{song.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};