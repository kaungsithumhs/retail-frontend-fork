import { cn } from "@/common/utils";
import { inter, notoSansMyanmar, pyidaungsu } from "@/lib/fonts";
import { Toaster } from "sonner";
import { useAuthStore } from "@/lib/store/authStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    const hasToken = checkAuth();

    // If no token and trying to access protected route
    if (!hasToken) {
      // TODO: Redirect to login page
      console.log("You are not logged in");
    }
  }, [router.pathname, checkAuth, router]);

  return (
    <div
      className={cn(
        "rt-flex rt-items-center rt-justify-center rt-bg-white rt-overflow-y-auto",
        notoSansMyanmar.variable,
        pyidaungsu.variable,
        inter.variable,
      )}
    >
      <div className="rt-container">
        <Component {...pageProps} />
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
