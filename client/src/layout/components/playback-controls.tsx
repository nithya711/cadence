import { useEffect, useRef, useState } from "react";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import { usePlayerStore } from "@/store/use-player-store";

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");

        const audio = audioRef.current;

        if(!audio) return;

        const handleUpdateTime = () => setCurrentTime(audio.currentTime);
        const handleUpdateDuration = () => setDuration(audio.duration);
        const handleEnded = () => usePlayerStore.setState({ isPlaying: false });

        audio.addEventListener("timeupdate", handleUpdateTime);
        audio.addEventListener("loadedmetadata", handleUpdateDuration);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleUpdateTime);
            audio.removeEventListener("loadedmetadata", handleUpdateDuration);
            audio.removeEventListener("ended", handleEnded);
        };        
    }, [currentSong]);

    const handleSeek = (value: number[]) => {
        if(audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    };

    return (
        <footer className="h-20 sm:h-24 bg-[#20356c] border-4 border-[#6a789d]/70 px-4 rounded-xl mx-2 mb-2">
            <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto rounded-md">
                <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
                    {currentSong && (
                        <>
                            <img src={currentSong.imageUrl} alt={currentSong.title} className="size-14 object-cover rounded-md border-3 border-[#6a789d]/70"/>
                            <div className="flex-1 min-w-0 hover:cursor-default">
                                <div className="font-medium text-base text-[#b4bbce] truncate">
                                    {currentSong.title}
                                </div>
                                <div className="text-sm text-[#6a789d]/70 truncate">
                                    {currentSong.artist}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:inline-flex text-[#0f0e32] hover:text-[#0f0e32] bg-[#6a789d] border-2 border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-all">
                                <Shuffle className="size-4 stroke-3"/>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={playPrevious}
                            disabled={!currentSong}
                            className="text-[#0f0e32] hover:text-[#0f0e32] bg-[#6a789d] border-2 border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-all">
                                <SkipBack className="size-4 stroke-3"/>
                        </Button>
                        <Button
                            size="icon"
                            onClick={togglePlay}
                            disabled={!currentSong}
                            className="bg-[#b4bbce] hover:bg-[#b4bbce]/80 hover:cursor-pointer border-2 hover:scale-110 border-[#0f0e32] text-[#0f0e32] rounded-full size-12 mt-1">
                                {isPlaying ? <Pause className="size-5 stroke-3"/> : <Play className="size-5 stroke-3"/>}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={playNext}
                            disabled={!currentSong}
                            className="text-[#0f0e32] hover:text-[#0f0e32] bg-[#6a789d] border-2 border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-all">
                                <SkipForward className="size-4 stroke-3"/>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:inline-flex text-[#0f0e32] hover:text-[#0f0e32] bg-[#6a789d] border-2 border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-all">
                                <Repeat className="size-4 stroke-3"/>
                        </Button>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 w-full">
                        <div className="text-xs text-[#b4bbce]">
                            {formatTime(currentTime)}
                        </div>
                        <Slider
                            value={[currentTime]}
                            max={duration || 100}
                            step={1}
                            onValueChange={handleSeek}
                            className="w-full hover:cursor-grab active:cursor-grabbing"/>
                        <div className="text-xs text-[#b4bbce]">
                            {formatTime(duration)}
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-[#6a789d] hover:text-[#0f0e32] hover:border-2 hover:border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-transform">
                            <Mic2 className="size-4 stroke-3"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-[#6a789d] hover:text-[#0f0e32] hover:border-2 hover:border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-transform">
                            <ListMusic className="size-4 stroke-3"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-[#6a789d] hover:text-[#0f0e32] hover:border-2 hover:border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-transform">
                            <Laptop2 className="size-4 stroke-3"/>
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-[#6a789d] hover:text-[#0f0e32] hover:border-2 hover:border-[#0f0e32] hover:bg-[#6a789d]/70 hover:cursor-pointer hover:scale-110 transition-transform">
                                <Volume2 className="size-4 stroke-3"/>
                        </Button>
                        <Slider
                            value={[volume]}
                            max={100}
                            step={1}
                            className="w-24 hover:cursor-grab active:cursor-grabbing"
                            onValueChange={(value) => {
                                setVolume(value[0]);

                                if(audioRef.current) {
                                    audioRef.current.volume = value[0] / 100;
                                }
                            }}/>
                    </div>
                </div>
            </div>
        </footer>
    );
}