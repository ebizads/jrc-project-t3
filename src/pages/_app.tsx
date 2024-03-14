import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Roboto } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <main className={roboto.className}>
                <Component {...pageProps} />
            </main>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
