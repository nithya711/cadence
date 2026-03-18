export const SectionGridSkeleton = () => {
    return (
        <div className="mb-8">
            <div className="h-8 w-48 bg-[#0f0e32]/40 rounded mb-4 animate-pulse"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-[#0f0e32]/30 p-4 rounded-md animate-pulse">
                        <div className="aspect-square rounded-md bg-[#0f0e32]/90 mb-4"/>
                        <div className="h-4 bg-[#0f0e32]/90 rounded w-3/4 mb-2"/>
                        <div className="h-4 bg-[#0f0e32]/90 rounded w-1/2"/>
                    </div>
                ))}
            </div>
        </div>
    );
};