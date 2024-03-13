import HeaderNav from "../components/HeaderNav";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en" data-theme="darkTheme">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://kit-pro.fontawesome.com/releases/v6.1.1/css/pro.css"
                />
            </Head>
            <body >
                <HeaderNav />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}