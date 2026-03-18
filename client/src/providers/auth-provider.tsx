import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";

import { useAuthStore } from "@/store/use-auth-store";

import { axiosInstance } from "@/lib/axios";

const updateApiToken = (token: string | null) => {
    if(token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    delete axiosInstance.defaults.headers.common["Authorization"];
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, userId } = useAuth();

    const { checkAdminStatus } = useAuthStore();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async() => {
            try {
                const token = await getToken();

                updateApiToken(token);

                if(token) {
                    await checkAdminStatus();
                }
            } catch (error) {
                updateApiToken(null);
                console.log("Error : ", error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [getToken, userId, checkAdminStatus]);

    if(isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader className="size-8 text-[#0f0e32] animate-spin"/>
            </div>
        );
    }

    return (
        <>
          {children}
        </>
    );
};