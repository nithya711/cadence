import { useEffect } from "react";
import { Calendar, Music, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useMusicStore } from "@/store/use-music-store";

export const AlbumsTable = () => {
    const { albums, deleteAlbum, fetchAlbums } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-[#265958]/1 border-[#0f0e32]">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="text-[#0f0e32]">Title</TableHead>
                    <TableHead className="text-[#0f0e32]">Artist</TableHead>
                    <TableHead className="text-[#0f0e32]">Release Year</TableHead>
                    <TableHead className="text-[#0f0e32]">Songs</TableHead>
                    <TableHead className="text-right text-[#0f0e32]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {albums.map((album) => (
                    <TableRow key={album._id} className="hover:bg-white/5 border-[#0f0e32]">
                        <TableCell>
                            <img src={album.imageUrl} alt={album.title} className="size-10 rounded-lg object-cover border-2 border-[#0f0e32]"/>
                        </TableCell>
                        <TableCell className="font-medium">
                            {album.title}
                        </TableCell>
                        <TableCell>
                            {album.artist}
                        </TableCell>
                        <TableCell>
                            <span className="inline-flex items-center gap-1">
                                <Calendar className="size-5 stroke-3 mr-1 text-[#a2c4e1]/60"/>
                                {album.releaseYear}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="inline-flex items-center gap-1">
                                <Music className="size-5 stroke-3 mr-1 text-[#a2c4e1]/60"/>
                                {album.songs.length} songs
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteAlbum(album._id)}
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