import { useRouter } from "next/router";
import App, { AppProps, AppContext } from "next/app";
import HeaderNav from "../components/HeaderNav";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";

import { api } from "~/utils/api";
import "@mantine/core/styles.css";

import "~/styles/globals.css";
import Footer from "~/components/Footer";

const theme = createTheme({
    /** Put your mantine theme override here */
});

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const router = useRouter();

    const renderComponent = ![
        "/",
        "/forgotPassword",
        "/forgotPassword/error",
        "/forgotPassword/check",
    ].includes(router.pathname);

    return (
        <SessionProvider session={session}>
            <MantineProvider theme={theme} defaultColorScheme="dark">
                <main style={{ fontFamily: "Roboto, sans-serif" }}>
                    {renderComponent && <HeaderNav />}
                    <Component {...pageProps} />
                    <Footer />
                </main>
            </MantineProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
