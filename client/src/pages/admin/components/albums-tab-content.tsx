import { Library } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { AlbumsTable } from "./albums-table";
import { AddAlbumDialog } from "./add-album-dialog";

export const AlbumsTabContent = () => {
    return (
        <Card className="bg-[#265958]/70 border-4 border-[#0f0e32] text-[#a2c4e1]/80">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-[#a2c4e1]">
                            <Library className="size-6 stroke-3"/>
                            Albums library
                        </CardTitle>
                        <CardDescription className="text-[#a2c4e1]/60">
                            Manage your album collection
                        </CardDescription>
                    </div>
                    <AddAlbumDialog/>
                </div>
            </CardHeader>
            <CardContent>
                <AlbumsTable/>
            </CardContent>
        </Card>
    );
};