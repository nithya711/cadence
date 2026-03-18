import { useEffect } from "react";
import { Album, Music } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Header } from "./components/header";
import { DashboardStats } from "./components/dashboard-stats";
//rename
import { SongsTabContent } from "./components/songs-tab-content";
import { AlbumsTabContent } from "./components/albums-tab-content";

import { useAuthStore } from "@/store/use-auth-store";
import { useMusicStore } from "@/store/use-music-store";

const AdminPage = () => {
    const { isAdmin, isLoading } = useAuthStore();
    const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();
    }, [fetchAlbums, fetchSongs, fetchStats]);

    if(!isAdmin && !isLoading) {
        return (
            <div>
                Unauthorized
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#003480] font-chango p-8">
            <Header/>
            <DashboardStats/>
            <Tabs defaultValue="songs" className="space-y-6">
                <TabsList className="p-1 bg-[#147d9b]/80 border-3 border-[#0f0e32]">
                    <TabsTrigger value="songs" className="m-1 p-3 data-[state=active]:bg-black/40">
                        <Music className="mr-2 size-4 stroke-3 text-[#a2c4e1]/70"/>
                        <span className="text-[#a2c4e1]/70">Songs</span>
                    </TabsTrigger>
                    <TabsTrigger value="albums" className="p-3 data-[state=active]:bg-black/40">
                        <Album className="mr-2 size-4 stroke-3 text-[#a2c4e1]/70"/>
                        <span className="text-[#a2c4e1]/70">Albums</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="songs">
                    <SongsTabContent/>
                </TabsContent>
                <TabsContent value="albums">
                    <AlbumsTabContent/>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminPage;