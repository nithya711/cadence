import { useSignIn } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const SignInOAuthButton = () => {
    const { signIn, isLoaded } = useSignIn();

    if(!isLoaded) return null;

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback",
        });
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="secondary"
                    onClick={signInWithGoogle}
                    className="w-full rounded-full h-11 border-3 border-gray-500 cursor-pointer">
                        <FcGoogle className="size-5 rounded-full"/>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
                <p className="text-xs font-chango">Continue with Google</p>
            </TooltipContent>              
        </Tooltip>
    );
};