import { Calendar, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useMusicStore } from "@/store/use-music-store";

export const SongsTable = () => {
    const { songs, isLoading, error, deleteSong } = useMusicStore();

    if(isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-[#a2c4e1]/60">Loading songs...</div>
            </div>
        );
    }

    if(error) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-[#265958]/1 border-[#0f0e32]">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="text-[#0f0e32]">Title</TableHead>
                    <TableHead className="text-[#0f0e32]">Artist</TableHead>
                    <TableHead className="text-[#0f0e32]">Release Date</TableHead>
                    <TableHead className="text-right text-[#0f0e32]">Actions</TableHead>                    
                </TableRow>
            </TableHeader>
            <TableBody>
                {songs.map((song) => (
                    <TableRow key={song._id} className="hover:bg-white/5 border-[#0f0e32]">
                        <TableCell>
                            <img src={song.imageUrl} alt={song.title} className="size-10 rounded-lg object-cover border-2 border-[#0f0e32]"/>
                        </TableCell>
                        <TableCell className="font-medium">
                            {song.title}
                        </TableCell>
                        <TableCell>
                            {song.artist}
                        </TableCell>
                        <TableCell>
                            <span className="inline-flex items-center gap-1">
                                <Calendar className="size-5 stroke-3 mr-1 text-[#a2c4e1]/60"/>
                                {song.createdAt.split("T")[0]}
                            </span>
                        </TableCell>
                            {/* Can remove div */}
                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteSong(song._id)}
                                    className="text-[#6f000a] hover:text-red-600 hover:bg-[#265958]/1 transition-none">
                                        <Trash2 className="size-5 stroke-3 mr-1"/>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};