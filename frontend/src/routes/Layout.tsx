import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useNavigation } from "react-router";
import { Outlet } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Layout() {
    const navigation = useNavigation();

    useEffect(() => {
        NProgress.configure({ showSpinner: false });

        if (navigation.state == "loading") {
            NProgress.start();
        } else NProgress.done();
    }, [navigation.state]);

    return (
        <>
            <Outlet />
            <Toaster />
        </>
    );
}
