import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layout/main-layout";

import Home from "./pages/home/Home";
import AuthCallback from "./pages/auth-callback/auth-callback-page";
import Album from "./pages/album/album-page";
import Admin from "./pages/admin/admin-page";
import NotFound from "./pages/not-found/not-found-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={ <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} /> } />
        <Route path="/auth-callback" element={ <AuthCallback/> } />
        <Route path="/admin" element={ <Admin/> } />

        <Route element={ <MainLayout/> }>
          <Route path="/" element={ <Home/> } />
          <Route path="/albums/:albumId" element={ <Album/> } />
          <Route path="*" element={ <NotFound/> } />
        </Route>
      </Routes>
      <Toaster/>
    </>
  );
};

export default App
