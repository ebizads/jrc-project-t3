import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Generator1 from "~/components/Generator1";
import Generator2 from "~/components/Generator2";
import Generator3 from "~/components/Generator3";
import GeneratorControlStatus from "~/components/GeneratorControlStatus";
import PowerSupplyStatus from "~/components/PowerSupplyStatus";
import RemoteOperation from "~/components/RemoteOperation";
import StatusCard from "~/components/StatusCard";
import StatusDayLog from "~/components/StatusDayLog";
import StatusDiagram from "~/components/StatusDiagram";
import TestSwitch from "~/components/TestSwitch";

import { api } from "~/utils/api";
import { Status } from "~/utils/types";

export default function Home() {
    // const hello = api.post.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <div>
                <Head>
                    <title>JRC Monitoring & Control System Dashboard</title>
                    <meta
                        name="description"
                        content="JRC Monitoring Dashboard"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/jrc-icon.svg" />
                </Head>
                <div
                    className="hero min-h-[40vh]"
                    style={{
                        backgroundImage:
                            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
                    }}
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-3xl">
                            <h1 className="mb-2 text-3xl font-bold">
                                The Project for Improving Flood Forecasting and
                                Warning System for Cagayan De Oro River Basin
                            </h1>
                            <p className="mb-5 text-base font-semibold uppercase tracking-[0.15em]">
                                Monitoring & Control System
                            </p>
                        </div>
                    </div>
                </div>
                {/* main */}
                <main
                    className={`flex min-h-screen w-full flex-col items-center justify-between p-12 text-primary `}
                >
                    <div className="flex h-full w-full flex-row ">
                        {/* Generator Card 1 */}
                        <Generator1 generatorName="CDORFFWC" />

                        {/* Generator Card 2 */}
                        <Generator2 generatorName="XR1 - LIBONA" />

                        {/* Generator Card 3 */}
                        <Generator3 generatorName="XR2 - DAGUMBAAN" />
                    </div>
                </main>
            </div>
        </>
    );
}

function AuthShowcase() {
    const { data: sessionData } = useSession();

    const secretMessage = "secret message";

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
                {sessionData && (
                    <span>Logged in as {sessionData.user?.name}</span>
                )}
                {secretMessage && <span> - {secretMessage}</span>}
            </p>
            <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}
