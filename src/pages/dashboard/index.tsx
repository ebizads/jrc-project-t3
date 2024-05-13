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

import ModalVerification from "~/components/ModalVerification";
import {
    getDataValueEquivalent,
    getDataValueEquivalentTest,
} from "~/utils/functions";
import ModalLoading from "~/components/ModalLoading";
import Generator2 from "~/components/Generator2";
import Generator3 from "~/components/Generator3";
import { Pagination } from "@mantine/core";

export default function Home() {
    // const hello = api.post.hello.useQuery({ text: "from tRPC" });
    const [cdoData, setCDOData] = useState<Array<TestStatus> | null>(null);
    const [xr1Data, setXR1Data] = useState<Array<TestStatus> | null>(null);
    const [xr2Data, setXR2Data] = useState<Array<TestStatus> | null>(null);

    const [cdoDigitalOutputs, setCDODigitalOutputs] =
        useState<Array<TestStatus> | null>(null);
    const [xr1DigitalOutputs, setXR1DigitalOutputs] =
        useState<Array<TestStatus> | null>(null);
    const [xr2DigitalOutputs, setXR2DigitalOutputs] =
        useState<Array<TestStatus> | null>(null);

    const [testDataFinal, setTestDataFinal] = useState<Status[]>([]);
    const { data, refetch } = api.generator.findAllGenerators.useQuery({});

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        // setSelected(index);
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCDO = await fetch("api/digitalInputs/fetchDigitalInputsCDO", {
                    // next: {
                    //     revalidate: 600
                    // }
                });
                const responseXR1 = await fetch("api/digitalInputs/fetchDigitalInputsXR1", {
                    // next: {
                    //     revalidate: 600
                    // }
                });
                const responseXR2 = await fetch("api/digitalInputs/fetchDigitalInputsXR2", {
                    // next: {
                    //     revalidate: 600
                    // }
                });
                const inputDataCDO = (await responseCDO.json()) as TestStatus[];
                const inputDataXR1 = (await responseXR1.json()) as TestStatus[];
                const inputDataXR2 = (await responseXR2.json()) as TestStatus[];


                const responseOutputCDO = await fetch("api/digitalOutputs/fetchDigitalOutputsCDO", {
                    // next: {
                    //     revalidate: 600
                    // }
                });
                const responseOutputXR1 = await fetch("api/digitalOutputs/fetchDigitalOutputsXR1", {
                    // next: {
                    //     revalidate: 600
                    // }
                });
                const responseOutputXR2 = await fetch("api/digitalOutputs/fetchDigitalOutputsXR2", {
                    // next: {
                    //     revalidate: 600
                    // }
                });
                const outputDataCDO = (await responseOutputCDO.json()) as TestStatus[];
                const outputDataXR1 = (await responseOutputXR1.json()) as TestStatus[];
                const outputDataXR2 = (await responseOutputXR2.json()) as TestStatus[];

                // console.log(inputDataCDO)
                // console.log(inputDataXR1)
                // console.log(inputDataXR2)

                setCDOData(inputDataCDO);
                setXR1Data(inputDataXR1);
                setXR2Data(inputDataXR2);

                setCDODigitalOutputs(outputDataCDO);
                setXR1DigitalOutputs(outputDataXR1);
                setXR2DigitalOutputs(outputDataXR2);

            } catch (error) {
                <Link href="/settings" />;
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
            <div className="">
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

                <div className=" absolute z-5 min-h-[130vh] w-full bg-[url('https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg')] bg-slate-600 bg-cover bg-no-repeat opacity-25 blur-sm ">
                    <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-base-100"></div>
                </div>

                <div className=" hero min-h-[40vh] opacity-100">
                    {/* <div className="hero-overlay bg-opacity-60"></div> */}
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-3xl">
                            <h1 className="mb-2 text-3xl font-bold">
                                {data?.generators[3]?.generatorName}
                            </h1>
                            <p className="mb-5 text-base font-semibold uppercase tracking-[0.15em]">
                                {data?.generators[4]?.generatorName}
                            </p>
                        </div>
                    </div>
                </div>
                {/* <Pagination total={10} color="gray" /> */}

                {/* main */}
                <main
                    className={`flex min-h-screen w-full flex-col items-center justify-between px-12 pb-12 text-primary `}
                >
                    <div className="flex h-full w-full flex-row z-10">
                        {/* Generator Card 1 CDO*/}
                        <Generator1
                            refetch={refetch}
                            generatorId={1}
                            // generatorName="CDORFFWC"
                            generatorName={
                                data?.generators[0]?.generatorName ?? ""
                            }
                            generatorData={cdoData ?? []}
                            // generatorOutputData={cdoDigitalOutputs ?? []}
                            runningHours={data?.generators[0]?.runningTime ?? 0}
                        />

                        {/* Generator Card 2 XR1*/}
                        <Generator2
                            refetch={refetch}
                            generatorId={2}
                            // generatorName="XR1 - LIBONA"
                            generatorName={
                                data?.generators[1]?.generatorName ?? ""
                            }
                            generatorData={xr1Data ?? []}
                            generatorOutputData={xr1DigitalOutputs ?? []}
                            runningHours={7.89}
                        />

                        {/* Generator Card 3  XR2*/}
                        <Generator3
                            refetch={refetch}
                            generatorId={3}
                            // generatorName="XR2 - DAGUMBAAN"
                            generatorName={
                                data?.generators[2]?.generatorName ?? ""
                            }
                            generatorData={xr2Data ?? []}
                            generatorOutputData={xr2DigitalOutputs ?? []}
                            runningHours={17.36}
                        />
                    </div>
                    {/* main */}
                </main>
            </div>
        </>
    );
}
