import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { axiosInstance } from "@/lib/axios";

export const AddAlbumDialog = () => {
    const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] =useState<File | null>(null);
    const [newAlbum, setNewAlbum] = useState({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
    });


    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async() => {
        setIsLoading(true);

        try {
            if(!imageFile) {
                return toast.error("Please add an image");
            }

            const formData = new FormData();

            formData.append("title", newAlbum.title);
            formData.append("artist", newAlbum.artist);
            formData.append("releaseYear", newAlbum.releaseYear.toString());
            formData.append("imageFile", imageFile);

            await axiosInstance.post("/admin/albums", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setNewAlbum({
                title: "",
                artist: "",
                releaseYear: new Date().getFullYear(),
            });
            setImageFile(null);
            setIsAlbumDialogOpen(false);

            toast.success("Created album");
        } catch(error) {
            toast.error("Failed to create album");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-violet-500/80 hover:bg-violet-500 border-3 border-violet-950 text-white hover:translate-0.5 transition-none">
                    <Plus className="mr-1 size-5 stroke-3"/>
                    Add album
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#265958] border-4 border-[#a2c4e1] text-white/70 font-chango">
                <DialogHeader>
                    <DialogTitle>
                        Add new album
                    </DialogTitle>
                    <DialogDescription className="text-[#a2c4e1]/60">
                        Add a new album to your collection
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"/>
                    <div
                        className="flex items-center justify-center p-6 border-3 border-dashed border-[#a2c4e1] rounded-lg cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}>
                            <div className="text-center">
                                <div className="p-3 bg-[#a2c4e1] border-3 border-[#0f0e32] rounded-full inline-block mb-2">
                                    <Upload className="size-6 stroke-3 text-[#0f0e32]"/>
                                </div>
                                <div className="text-sm text-[#a2c4e1]/60 mb-2">
                                    {imageFile ? imageFile.name : "Upload album cover image"}
                                </div>
                                <Button variant="outline" size="sm" className="text-xs text-[#0f0e32]/80 hover:text-[#0f0e32] bg-[#a2c4e1] hover:bg-[#a2c4e1] border-3 border-[#0f0e32]">
                                    Choose file
                                </Button>
                            </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Album title</label>
                        <Input
                            value={newAlbum.title}
                            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                            className="mt-1 text-[#0f0e32]/90 placeholder:text-[#0f0e32]/80 bg-[#a2c4e1] border-3 border-[#0f0e32]"
                            placeholder="Enter album title"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Artist</label>
                        <Input
                            value={newAlbum.artist}
                            onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                            className="mt-1 text-[#0f0e32]/90 placeholder:text-[#0f0e32]/80 bg-[#a2c4e1] border-3 border-[#0f0e32]"
                            placeholder="Enter artist name"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm">Release year</label>
                        <Input
                            type="number"
                            value={newAlbum.releaseYear}
                            onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
                            className="mt-1 text-[#0f0e32]/90 placeholder:text-[#0f0e32]/80 bg-[#a2c4e1] border-3 border-[#0f0e32]"
                            placeholder="Enter release year"
                            min={1900}
                            max={new Date().getFullYear()}/>                                                    
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsAlbumDialogOpen(false)}
                        disabled={isLoading}
                        className="text-[#0f0e32] hover:text-[#0f0e32] bg-[#a2c4e1] hover:bg-[#a2c4e1] border-3 border-[#0f0e32] hover:translate-0.5 transition-none">
                            Cancel
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleSubmit}
                        disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}
                        className="text-white hover:text-white bg-violet-500/70 hover:bg-violet-500/70 border-3 border-violet-950 hover:border-violet-950 hover:translate-0.5 transition-none">
                            {isLoading ? "Creating album..." : "Add album"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );    
};