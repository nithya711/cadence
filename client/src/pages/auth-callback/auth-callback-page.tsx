import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { axiosInstance } from "@/lib/axios";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const syncAttempted = useRef(false);

    const { isLoaded, user } = useUser();

    useEffect(() => {
        const syncUser = async() => {
            if(!isLoaded || !user || syncAttempted.current) return;

            try {
                syncAttempted.current = true;
                await axiosInstance.post("/auth/callback", {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl: user.imageUrl,
                });
            } catch(error) {
                console.log("Error authenticating : ", error);
            } finally {
                navigate("/");
            }
        };

        syncUser();
    }, [isLoaded, user, navigate]);

    return (
        <div className="h-screen w-full bg-[#003480] flex items-center justify-center">
            <Card className="w-[90%] max-w-md bg-[#20356c] border-4 border-[#6a789d]/70 rounded-xl">
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <Loader className="size-6 text-[#0f0e32] animate-spin"/>
                    <h3 className="text-[#b4bbce] text-xl font-bold">
                        Logging you in
                    </h3>
                    <p className="text-[#b4bbce] text-sm">
                        Redirecting...
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthCallbackPage;