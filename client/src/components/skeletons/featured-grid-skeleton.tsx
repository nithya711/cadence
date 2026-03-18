export const FeaturedGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center bg-[#20356c]/70 rounded-md overflow-hidden animate-pulse">
                    <div className="size-16 sm:w-20 sm:h-20 bg-[#0f0e32]/50 flex-shrink-0"/>
                    <div className="flex-1 p-4">
                        <div className="h-4 bg-[#0f0e32]/50 rounded w-3/4 mb-2"/>
                    </div>
                </div>
            ))}
        </div>
    );
};