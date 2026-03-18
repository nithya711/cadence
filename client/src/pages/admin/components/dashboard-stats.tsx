import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";

import { StatsCard } from "./stats-card";

import { useMusicStore } from "@/store/use-music-store";

export const DashboardStats = () => {
    const { stats } = useMusicStore();

    const statsData = [
        {
            icon: ListMusic,
            label: "Total Songs",
            value: stats.totalSongs.toString(),
            bgColor: "bg-[#baffc9]/80",
            iconColor: "text-emerald-500",
            borderColor: "border-emerald-600",
        },
        {
            icon: Library,
            label: "Total Albums",
            value: stats.totalAlbums.toString(),
            bgColor: "bg-[#eecbff]/80",
            iconColor: "text-violet-500",
            borderColor: "border-violet-600",
        },
        {
            icon: Users2,
            label: "Total Artists",
            value: stats.totalArtists.toString(),
            bgColor: "bg-[#ffdfba]/80",
            iconColor: "text-orange-500",
            borderColor: "border-orange-600",
        },
        {
            icon: PlayCircle,
            label: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            bgColor: "bg-[#bae1ff]/80",
            iconColor: "text-sky-500",
            borderColor: "border-sky-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat) => (
                <StatsCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    bgColor={stat.bgColor}
                    iconColor={stat.iconColor}
                    borderColor={stat.borderColor}/>
            ))}
        </div>
    );
};