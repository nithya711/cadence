import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useMusicStore } from "@/store/use-music-store";
import { usePlayerStore } from "@/store/use-player-store";

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
    const { albumId } = useParams();
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

    useEffect(() => {
        if(albumId) {
            fetchAlbumById(albumId);
        }
    }, [fetchAlbumById, albumId]);

    if(isLoading) return null;

    const handlePlayAlbum = () => {
        if(!currentAlbum) return;

        const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);

        if(isCurrentAlbumPlaying) {
            togglePlay();
        } else {
            playAlbum(currentAlbum?.songs, 0);
        }
    };

    const handlePlaySong = (index: number) => {
        if(!currentAlbum) return;

        playAlbum(currentAlbum?.songs, index);
    };

    return (
        <div className="h-full border-4 border-[#0f0e32] rounded-t-[50px] rounded-xl">
            <ScrollArea className="h-full rounded-xl rounded-t-[50px]">
                <div className="relative min-h-full">
                    <div
                        className="absolute inset-0 bg-[#265958]/70  text-[#a2c4e1] pointer-events-none"
                        aria-hidden="true"/>
                    <div className="relative z-10">
                        <div className="flex p-6 gap-6 pb-8 text-[#a2c4e1]">
                            <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className="w-[240px] h-[240px] shadow-xl rounded-xl border-4 border-[#0f0e32]"/>
                            <div className="flex flex-col justify-end">
                                <p className="text-md">Album</p>
                                <h1 className="text-7xl font-bold my-4">{currentAlbum?.title}</h1>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-medium">{currentAlbum?.artist}</span>
                                    <span>• {currentAlbum?.songs.length} songs</span>
                                    <span>• {currentAlbum?.releaseYear}</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-4 flex items-center gap-6">
                            <Button
                                size="icon"
                                onClick={handlePlayAlbum}
                                className="size-14 rounded-full bg-[#147d9b] hover:bg-[#147d9b]/80 border-3 border-[#0f0e32] hover:scale-107 transition-all">
                                    {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id)
                                            ? <Pause className="size-6 stroke-3 text-[#0f0e32]"/>
                                            : <Play className="size-7 stroke-3 text-[#0f0e32]"/>
                                        }
                            </Button>
                        </div>
                        <div className="bg-black/20">
                            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-[#a2c4e1] border-y-2 border-dashed border-[#a2c4e1]/50">
                                <div>#</div>
                                <div>Title</div>
                                <div>Release date</div>
                                <div>
                                    <Clock className="size-5 stroke-3"/>
                                </div>
                            </div>
                            <div className="px-6">
                                <div className="space-y-2 py-4">
                                    {currentAlbum?.songs.map((song, index) => {
                                        const isCurrentSong = currentSong?._id === song._id;

                                        return (
                                            <div
                                                key={song._id}
                                                onClick={() => handlePlaySong(index)}
                                                className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-[#a2c4e1] hover:bg-white/5 rounded-md group cursor-pointer`}>
                                                    <div className="flex items-center justify-center">
                                                        {isCurrentSong && isPlaying
                                                            ? <div className="text-xl text[#a2c4e1]">♫</div>
                                                            : <span className="group-hover:hidden">{index + 1}.</span>
                                                        }
                                                        {!isCurrentSong && <Play className="size-4 stroke-3 hidden group-hover:block"/>}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <img src={song.imageUrl} alt={song.title} className="size-10 rounded-md border-3 border-[#a2c4e1]/60"/>
                                                        <div>
                                                            <div className="font-medium text-white">{song.title}</div>
                                                            <div className="text-[#a2c4e1]/60">{song.artist}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                                                    <div className="flex items-center">{formatDuration(song.duration)}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default AlbumPage;