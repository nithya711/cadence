import { Music } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { SongsTable } from "./songs-table";
import { AddSongDialog } from "./add-song-dialog";

export const SongsTabContent = () => {
    return (
        <Card className="bg-[#265958]/70 border-4 border-[#0f0e32] text-[#a2c4e1]/80">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-[#a2c4e1] mb-1">
                            <Music className="size-5 stroke-3"/>
                            Songs Library
                        </CardTitle>
                        <CardDescription className="text-[#a2c4e1]/60">
                            Manage your music tracks
                        </CardDescription>
                    </div>
                    <AddSongDialog/>
                </div>
            </CardHeader>
            <CardContent>
                <SongsTable/>
            </CardContent>
        </Card>
    );
};