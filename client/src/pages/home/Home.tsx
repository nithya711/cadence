import { useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Topbar } from "@/components/topbar";

import { FeaturedSection } from "./components/featured-section";
import { SectionGrid } from "./components/section-grid";

import { useMusicStore } from "@/store/use-music-store";
import { usePlayerStore } from "@/store/use-player-store";

const Home = () => {
    const {
        fetchFeaturedSongs,
        fetchMadeForYouSongs,
        fetchTrendingSongs,
        isLoading,
        madeForYouSongs,
        featuredSongs,
        trendingSongs,
    } = useMusicStore();

    const { initializeQueue } = usePlayerStore();

    useEffect(() => {
        fetchFeaturedSongs();
        fetchMadeForYouSongs();
        fetchTrendingSongs();
    }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

    useEffect(() => {
        if((madeForYouSongs.length > 0) && (featuredSongs.length > 0) && (trendingSongs.length > 0)) {
            const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
            initializeQueue(allSongs);
        }
    }, [madeForYouSongs, featuredSongs, trendingSongs, initializeQueue]);

// change message
    return (
        <main className="relative border-4 border-[#0f0e32] rounded-t-[50px] rounded-xl overflow-hidden h-full bg-[#265958]/70  text-[#a2c4e1]">
            <Topbar/>
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold mb-6">
                        What's on your mind?
                    </h1>
                    <FeaturedSection/>

                    <div className="space-y-8">
                        <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading}/>
                        <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
                    </div>
                </div>
            </ScrollArea>
        </main>
    );
};

export default Home;