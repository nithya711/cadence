import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/clerk-react";

export const Header = () => {
    return (
        <div className="flex items-center justify-between relative bg-[#b4dafb]/90 border-4 border-[#0f0e32] outline-dashed outline-[#0f0e32]/50 -outline-offset-10 rounded-xl text-[#0f0e32] p-14 mb-4">
            <div className="absolute top-3 left-3 size-4 rounded-full border-3 border-[#0f0e32] bg-[#67beff]"/>
            <div className="absolute top-3 right-3 size-4 rounded-full border-3 border-[#0f0e32] bg-[#67beff]"/>
            <div className="absolute bottom-3 left-3 size-4 rounded-full border-3 border-[#0f0e32] bg-[#67beff]"/>
            <div className="absolute bottom-3 right-3 size-4 rounded-full border-3 border-[#0f0e32] bg-[#67beff]"/>
            <div className="flex items-center gap-3 mb-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">-- Music Manager --</h1>
                    <p className="text-[#0f0e32]/70 mt-1">Manage your music catalog</p>
                </div>
            </div>
                <Button className="absolute right-11 rounded-full p-1 bg-[#147d9b] hover:bg-[#147d9b]">
                    <UserButton/>
                </Button>
        </div>
    );
};