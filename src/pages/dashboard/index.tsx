import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import GeneratorControlStatus from "~/components/GeneratorControlStatus";
import LineChartExample from "~/components/LineChart";
import PowerSupplyStatus from "~/components/PowerSupplyStatus";
import RemoteOperation from "~/components/RemoteOperation";
import StatusCard from "~/components/StatusCard";
import StatusDayLog from "~/components/StatusDayLog";
import StatusDiagram from "~/components/StatusDiagram";
import TestSwitch from "~/components/TestSwitch";

import { api } from "~/utils/api";
import { Status, TestStatus } from "~/utils/types";
// import { fetchData } from "~/utils/dataApi";
import { useState } from "react";

import Generator1 from "~/components/Generator1";
import Generator2 from "~/components/Generator2";
import Generator3 from "~/components/Generator3";
import ModalVerification from "~/components/ModalVerification";
import {
    getDataValueEquivalent,
    getDataValueEquivalentTest,
} from "~/utils/functions";

export default function Home() {
    // const hello = api.post.hello.useQuery({ text: "from tRPC" });
    const [testData, setTestData] = useState<Array<TestStatus> | null>(null);
    const [testDigitalOutputs, setTestDigitlOutputs] =
        useState<Array<TestStatus> | null>(null);

    const [testDataFinal, setTestDataFinal] = useState<Status[]>([]);
    const { data, refetch } = api.generator.findAllGenerators.useQuery({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/fetchDigitalInputs",
                    {
                        // next: {
                        //     revalidate: 600
                        // }
                    });
                const jsonData = (await response.json()) as TestStatus[];

                const response1 = await fetch("/api/fetchDigitalOutputs",
                    {
                        // next: {
                        //     revalidate: 600
                        // }
                    });
                const jsonData1 = (await response1.json()) as TestStatus[];

                setTestData(jsonData);
                setTestDigitlOutputs(jsonData1)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const interval = setInterval(() => {
            void fetchData();
        }, 1000);

        // setInterval(, 1000);
        // void fetchData()
        return () => clearInterval(interval);
        // console.log("test data", testData);
    }, []);

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

                <div className=" absolute -z-50 min-h-[130vh] w-full bg-[url('https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg')] bg-cover bg-no-repeat opacity-25 blur-sm ">
                    <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-base-100"></div>
                </div>

                <div className=" hero min-h-[40vh]">
                    {/* <div className="hero-overlay bg-opacity-60"></div> */}
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
                    className={`flex min-h-screen w-full flex-col items-center justify-between px-12 pb-12 text-primary `}
                >
                    <div className="flex h-full w-full flex-row ">
                        {/* Generator Card 1 */}
                        <Generator1
                            generatorId={1}
                            // generatorName="CDORFFWC"
                            generatorName={data?.generators[0]?.generatorName ?? ""}
                            generatorData={testData ?? []}
                            generatorOutputData={testDigitalOutputs ?? []}
                            runningHours={3.49}
                        />

                        {/* Generator Card 2 */}
                        <Generator1
                            generatorId={2}
                            // generatorName="XR1 - LIBONA"
                            generatorName={data?.generators[1]?.generatorName ?? ""}
                            generatorData={testData ?? []}

                            runningHours={7.89}
                        />

                        {/* Generator Card 3 */}
                        <Generator1
                            generatorId={3}
                            // generatorName="XR2 - DAGUMBAAN"
                            generatorName={data?.generators[2]?.generatorName ?? ""}
                            generatorData={testData ?? []}
                            runningHours={17.36}
                        />
                    </div>
                </main>
            </div>
            {/* main */}
        </>
    );
}
