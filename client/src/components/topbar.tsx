import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Disc3, LayoutDashboardIcon } from "lucide-react";

import { SignInOAuthButton } from "./sign-in-oauth-button";

import { Button } from "./ui/button";

import { useAuthStore } from "@/store/use-auth-store";

export const Topbar = () => {
    const { isAdmin } = useAuthStore();

    return (
        <div className="sticky top-0 z-10">
            <div className="flex items-center justify-between p-9 relative bg-[#b4dafb] border-b-4 border-dashed border-[#0f0e32]/50 text-[#0f0e32]">
                <div className="absolute left-2 w-5 h-5 rounded-full border-3 border-[#302a27] bg-[#67beff] m-1"/>
                <div className="absolute right-2 w-5 h-5 rounded-full border-3 border-[#302a27] bg-[#67beff] m-1"/>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 hover:cursor-default">
                    <Disc3 className="size-10 stroke-3 animate-spin animation-duration-[2s]"/>
                    <p className="text-xl">CADENCE</p>
                </div>
                <div className="flex items-center gap-4 absolute right-11">
                    {isAdmin && (
                        <Button
                            variant="ghost"                            
                            className="bg-[#147d9b]/60 hover:bg-[#147d9b]/70 hover:translate-0.5 border-3 border-[#0f0e32] rounded-md transition-none"
                            asChild>
                            <Link to={"/admin"}>
                                <LayoutDashboardIcon className="size-5 mr-1 stroke-3"/>
                                Admin Dashboard
                            </Link>
                        </Button>
                    )}
                    <SignedOut>
                        <SignInOAuthButton/>
                    </SignedOut>
                    <SignedIn>
                        <Button className="rounded-full p-1 bg-[#147d9b] hover:bg-[#147d9b]">
                            <UserButton/>
                        </Button>
                    </SignedIn>
                </div>
            </div>
        </div>
    );
};