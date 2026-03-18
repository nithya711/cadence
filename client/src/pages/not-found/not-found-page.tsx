import { useNavigate } from "react-router-dom";
import { Home, Music2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-[#265958]/70  text-[#a2c4e1] border-4 border-[#0f0e32] rounded-t-[50px] rounded-xl flex items-center justify-center">
            <div className="text-center space-y-8 px-4">
                <div className="flex justify-center animate-bounce">
                    <Music2 className="size-20 stroke-4 text-[#0f0e32]"/>
                </div>
                <div className="space-y-4">
                    <h1 className="text-7xl font-bold">404</h1>
                    <h2 className="text-2xl font-semibold">Page not found</h2>
                    <p className="text-[#a2c4e1]/50 max-w-md mx-auto">
                        Looks like this track got lost in the shuffle. Let&apos;s get you back to music.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="bg-[#20356c] hover:bg-[#20356c]/70 border-3 border-[#6a789d]/80 hover:border-[#6a789d]/80 hover:translate-0.5 text-[#b4bbce] hover:text-[#b4bbce] w-full sm:w-auto transition-none">
                            Go back
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-[#60baae]/50 hover:bg-[#60baae]/40 border-3 border-[#0f0e32] text-[#0f0e32]/90 hover:translate-0.5 w-full sm:auto transition-none">
                            <Home className="mr-1 size-5 stroke-3 text-[#0f0e32]/90"/>
                            Back to home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;