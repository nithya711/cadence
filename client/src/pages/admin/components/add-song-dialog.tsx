import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { axiosInstance } from "@/lib/axios";

import { useMusicStore } from "@/store/use-music-store";

type NewSong = {
    title: string;
    artist: string;
    album: string;
    duration: string;
};

export const AddSongDialog = () => {
    const { albums } = useMusicStore();

    const [isSongDialogOpen, setIsSongDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newSong, setNewSong] = useState<NewSong>({
        title: "",
        artist: "",
        album: "",
        duration: "0",
    });

    const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
        audio: null,
        image: null,
    });

    const audioInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async() => {
        setIsLoading(true);

        try {
            if(!files.audio || !files.image) {
                return toast.error("Both image and audio are required");
            }

            const formData = new FormData();

            formData.append("title", newSong.title);
            formData.append("artist", newSong.artist);
            formData.append("duration", newSong.duration);
            if (newSong.album && newSong.album !== "none") {
                formData.append("albumId", newSong.album);
            }
            formData.append("audioFile", files.audio);
            formData.append("imageFile", files.image);

            await axiosInstance.post("/admin/songs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setNewSong({
                title: "",
                artist: "",
                album: "",
                duration: "0",
            });

            setFiles({
                audio: null,
                image: null,
            });

            toast.success("Song added");
        } catch(error: any) {
            toast.error("Failed to add song");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isSongDialogOpen} onOpenChange={setIsSongDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-500/80 hover:bg-emerald-500 border-3 border-emerald-950 text-white/90 hover:translate-0.5 transition-none">
                    <Plus className="mr-1 size-5 stroke-3"/>
                    Add song
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#265958] border-4 border-[#a2c4e1] text-white/70 font-chango max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        Add new song
                    </DialogTitle>
                    <DialogDescription className="text-[#a2c4e1]/60">
                        Add a new song to your music library
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <input
                        type="file"
                        accept="audio/*"
                        ref={audioInputRef}
                        onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
                        className="hidden"/>
                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
                        className="hidden"/>
                    <div
                        onClick={() => imageInputRef.current?.click()}
                        className="flex items-center justify-center p-6 border-3 border-dashed border-[#a2c4e1] rounded-lg cursor-pointer">
                            <div className="text-center">
                                {files.image ? (
                                    <div className="space-y-2">
                                        <div className="text-sm text-[#a2c4e1]/60 mb-2">Image selected: </div>
                                        <div className="text-xs text-white/60">{files.image.name.slice(0, 20)}</div>
                                    </div>                                    
                                ) : (
                                    <>
                                        <div className="p-3 bg-[#a2c4e1] border-3 border-[#0f0e32] rounded-full inline-block mb-2">
                                            <Upload className="size-6 stroke-3 text-[#0f0e32]"/>
                                        </div>
                                        <div className="text-sm text-[#a2c4e1]/60 mb-2">Upload song cover image</div>
                                        <Button variant="outline" size="sm" className="text-xs text-[#0f0e32]/80 hover:text-[#0f0e32] bg-[#a2c4e1] hover:bg-[#a2c4e1] border-3 border-[#0f0e32]">
                                            Choose file
                                        </Button>
                                    </>
                                )}
                            </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Upload audio</label>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => audioInputRef.current?.click()}
                                className="mt-1 w-full text-xs text-[#0f0e32]/80 hover:text-[#0f0e32] bg-[#a2c4e1] hover:bg-[#a2c4e1] border-3 border-[#0f0e32]">
                                    {files.audio ? files.audio.name.slice(0, 20) : "Choose audio file"}
                                </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={newSong.title}
                            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                            placeholder="Enter song title"
                            className="mt-1 text-[#0f0e32]/90 placeholder:text-[#0f0e32]/80 bg-[#a2c4e1] border-3 border-[#0f0e32]"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Artist</label>
                        <Input
                            value={newSong.artist}
                            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                            placeholder="Enter artist name"
                            className="mt-1 text-[#0f0e32]/90 placeholder:text-[#0f0e32]/80 bg-[#a2c4e1] border-3 border-[#0f0e32]"/>
                    </div>
             {/* change type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Duration (seconds)</label>
                        <Input
                            type="number"
                            min="0"
                            value={newSong.duration}
                            onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
                            className="mt-1 text-[#0f0e32]/90 placeholder:text-[#0f0e32]/80 bg-[#a2c4e1] border-3 border-[#0f0e32]"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Album (optional)</label>
                        <Select value={newSong.album} onValueChange={(value) => setNewSong({ ...newSong, album: value })}>
                            <SelectTrigger className="mt-1 bg-[#a2c4e1] border-3 border-[#0f0e32]">
                                <SelectValue placeholder="Select album"/>
                            </SelectTrigger>
                            <SelectContent className="bg-[#a2c4e1] border-3 border-[#0f0e32] font-chango">
                                <SelectItem value="none">
                                    <p className="text-[#0f0e32]/90">No album (single)</p>
                                </SelectItem>
                                {albums.map((album) => (
                                    <SelectItem key={album._id} value={album._id}>
                                        <p className="text-[#0f0e32]/90">{album.title}</p>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>                        
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsSongDialogOpen(false)}
                        disabled={isLoading}
                        className="text-[#0f0e32] hover:text-[#0f0e32] bg-[#a2c4e1] hover:bg-[#a2c4e1] border-3 border-[#0f0e32] hover:translate-0.5 transition-none">
                            Cancel
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-emerald-500/80 hover:bg-emerald-500/80 border-3 border-emerald-950 text-white/90 hover:text-white/90 hover:translate-0.5 transition-none">
                        {isLoading ? "Uploading..." : "Add song"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};