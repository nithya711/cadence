import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

import { type Song } from "@/types";

import { usePlayerStore } from "@/store/use-player-store";

interface PlayButtonProps {
    song: Song;
};

export const PlayButton = ({ song }: PlayButtonProps) => {
    const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();

    const isCurrentSong = currentSong?._id === song._id;

    const handlePlay = () => {
        if(isCurrentSong) {
            togglePlay();
        }

        setCurrentSong(song);
    };

    return (
        <Button
            size="icon"
            onClick={handlePlay}
            className={`m-0.5 absolute bottom-3 right-2 bg-[#147d9b] hover:bg-[#147d9b] border-2 border-[#0f0e32] cursor-pointer hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                {isCurrentSong && isPlaying
                 ? <Pause className="size-5 stroke-3 text-[#0f0e32]"/>
                 : <Play className="size-5 stroke-3 text-[#0f0e32]"/>}
        </Button>
    );
};