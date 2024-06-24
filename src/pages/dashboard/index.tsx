// import GeneratorControlStatus from "~/components/GeneratorControlStatus";
// import LineChartExample from "~/components/LineChart";
// import PowerSupplyStatus from "~/components/PowerSupplyStatus";
// import RemoteOperation from "~/components/RemoteOperation";
// import StatusCard from "~/components/StatusCard";
// import StatusDayLog from "~/components/StatusDayLog";
// import StatusDiagram from "~/components/StatusDiagram";
// import TestSwitch from "~/components/TestSwitch";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { fetchData } from "~/utils/dataApi";
// import ModalVerification from "~/components/ModalVerification";
// import {
//     getDataValueEquivalent,
//     getDataValueEquivalentTest,
// } from "~/utils/functions";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { api } from "~/utils/api";
import { Status, TestStatus } from "~/utils/types";
import { useState } from "react";
import Generator1 from "~/components/Generator1";
import Generator2 from "~/components/Generator2";
import Generator3 from "~/components/Generator3";
import ModalDashboardStatus from "~/components/ModalDashboardStatus";
import { ModalStatus } from "~/utils/enums";
import useSWR from 'swr'
import { useSession } from "next-auth/react";

const fetcher = async (url: string | URL | Request) => {
    const res = await fetch(url)

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        // Attach extra info to the error object.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error.message = await res.json()
        error.name = String(res.status)
        throw error
    }
    return res.json()
}
// const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function Home() {
    const { data: session } = useSession()

    // MUTATE FUNCTION FOR LOGS TAKEN FROM GENERATOR ROUTER
    const { mutate } = api.generator.createLog.useMutation({});

    // const [cdoData, setCDOData] = useState<Array<TestStatus> | null>(null);
    // const [xr1Data, setXR1Data] = useState<Array<TestStatus> | null>(null);
    // const [xr2Data, setXR2Data] = useState<Array<TestStatus> | null>(null);

    const [cdoDigitalOutputs, setCDODigitalOutputs] =
        useState<Array<TestStatus> | null>(null);
    const [xr1DigitalOutputs, setXR1DigitalOutputs] =
        useState<Array<TestStatus> | null>(null);
    const [xr2DigitalOutputs, setXR2DigitalOutputs] =
        useState<Array<TestStatus> | null>(null);

    const [testDataFinal, setTestDataFinal] = useState<Status[]>([]);
    const { data, refetch } = api.generator.findAllGenerators.useQuery({});
    const [modalOpen, setModalOpen] = useState(false);

    const [siteDownCDO, setSiteDownCDO] = useState(false);
    const [siteDownXR1, setSiteDownXR1] = useState(false);
    const [siteDownXR2, setSiteDownXR2] = useState(false);

    // const [firstLoad, setFirstLoad] = useState<boolean>(true);
    // const [firstLoad1, setFirstLoad1] = useState<boolean>(true);
    // const [firstLoad2, setFirstLoad2] = useState<boolean>(true);

    // SWR IMPLEMENTATION FOR FETCHING
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: dataCDO, isLoading: isLoadingCDO } = useSWR<Array<TestStatus> | null>("api/digitalInputs/fetchDigitalInputsCDO", fetcher
        // , { refreshInterval: 1000 }
        , {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            // refreshWhenHidden: true,
            refreshInterval: 1000, // Disable automatic polling
            // dedupingInterval: 1000, // Cache data for 10 minutes (adjust as needed)
            onSuccess: (data, key, config) => {
                // refetchGenerator1Statuses().then(res => console.log(res.data)).catch(error => console.log(error))
                if (session?.user.type == "Logger") {
                    if (siteDownCDO) {
                        mutate({
                            generatorId: 1,
                            status: "RUNNING",
                            status_type: "success",
                            status_msg: "Site CDOFFWC is currently",
                        });
                        setSiteDownCDO(false)
                        // setFirstLoad(false)
                    } else {
                        return
                    }
                }

            },
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Never retry on 404.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (error.status === 404) return

                // Only retry up to 3 times.
                if (retryCount >= 3) {
                    setSiteDownCDO(true)
                    return
                }

                // Retry after 5 seconds.
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setTimeout(() => revalidate({ retryCount }), 5000)
            }
        }
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: dataXR1, isLoading: isLoadingXR1 } = useSWR<Array<TestStatus> | null>("api/digitalInputs/fetchDigitalInputsXR1", fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            // refreshWhenHidden: true,
            refreshInterval: 1000, // Disable automatic polling
            // dedupingInterval: 1000, // Cache data for 10 minutes (adjust as needed)
            onSuccess: (data, key, config) => {
                if (session?.user.type == "Logger") {

                    if (siteDownXR1) {
                        mutate({
                            generatorId: 2,
                            status: "RUNNING",
                            status_type: "success",
                            status_msg: "Site XR1 is currently",
                        });
                        setSiteDownXR1(false)
                        // setFirstLoad1(false)
                    } else {
                        return
                    }
                }
            },
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Never retry on 404.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (error.status === 404) return

                // Only retry up to 3 times.
                if (retryCount >= 3) {
                    setSiteDownXR1(true)
                    return
                }

                // Retry after 5 seconds.
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setTimeout(() => revalidate({ retryCount }), 5000)
            }
        })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: dataXR2, isLoading: isLoadingXR2 } = useSWR<Array<TestStatus> | null>("api/digitalInputs/fetchDigitalInputsXR2", fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            // refreshWhenHidden: true,
            refreshInterval: 1000, // Disable automatic polling
            // dedupingInterval: 1000, // Cache data for 10 minutes (adjust as needed)
            onSuccess: (data, key, config) => {
                if (session?.user.type == "Logger") {
                    if (siteDownXR2) {
                        mutate({
                            generatorId: 3,
                            status: "RUNNING",
                            status_type: "success",
                            status_msg: "Site XR2 is currently",
                        });
                        setSiteDownXR2(false)
                        // setFirstLoad2(false)
                    } else {
                        return
                    }
                }
            },
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Never retry on 404.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (error.status === 404) return

                // Only retry up to 3 times.
                if (retryCount >= 3) {
                    setSiteDownXR2(true)
                    return
                }

                // Retry after 5 seconds.
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setTimeout(() => revalidate({ retryCount }), 5000)
            }
        }
    )

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

                {/* <div className="absolute min-h-[130vh] w-full ">
                    <Image
                        src="/dashboardBG.jpg"
                        alt="aaa"
                        className="absolute min-h-full w-full z-1 bg-slate-600 bg-cover bg-no-repeat opacity-25 blur-sm "
                    />
                    <div className="absolute h-full w-full z-10 bg-gradient-to-b from-transparent to-base-100"></div>
                </div> */}
                <div className=" z-5 absolute min-h-[130vh] w-full bg-slate-600 bg-[url('/dashboardBG.jpg')] bg-cover bg-no-repeat opacity-25 blur-sm ">
                    <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-base-100"></div>
                </div>

                <div className="hero min-h-[15vh] opacity-100">
                    {/* <div className="hero-overlay bg-opacity-60"></div> */}
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-3xl">
                            <h1 className="mb-2 text-3xl font-bold">
                                {data?.generators[3]?.generatorName}
                            </h1>
                            <p className="text-base font-semibold uppercase tracking-[0.15em]">
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

                    <div className="z-10 flex h-full w-full flex-row">
                        {/* Generator Card 1 CDO*/}
                        <Generator1
                            refetch={refetch}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            generatorError={siteDownCDO}
                            generatorId={1}
                            // generatorName="CDORFFWC"
                            generatorName={
                                data?.generators[0]?.generatorName ?? ""
                            }
                            // generatorData={cdoData ?? []}
                            generatorData={siteDownCDO ? [] : dataCDO}

                            generatorOutputData={cdoDigitalOutputs ?? []}
                            runningHours={data?.generators[0]?.runningTime ?? 0}
                        />

                        {/* Generator Card 2 XR1*/}
                        <Generator2
                            refetch={refetch}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            generatorError={siteDownXR1}
                            generatorId={2}
                            // generatorName="XR1 - LIBONA"
                            generatorName={
                                data?.generators[1]?.generatorName ?? ""
                            }
                            // generatorData={xr1Data ?? []}
                            generatorData={siteDownXR1 ? [] : dataXR1}

                            generatorOutputData={xr1DigitalOutputs ?? []}
                            runningHours={data?.generators[1]?.runningTime ?? 0}
                        />

                        {/* Generator Card 3  XR2*/}
                        <Generator3
                            refetch={refetch}
                            generatorId={3}
                            generatorError={siteDownXR2}
                            // generatorName="XR2 - DAGUMBAAN"
                            generatorName={
                                data?.generators[2]?.generatorName ?? ""
                            }
                            // generatorData={xr2Data ?? []}
                            generatorData={siteDownXR2 ? [] : dataXR2}

                            generatorOutputData={xr2DigitalOutputs ?? []}
                            runningHours={data?.generators[2]?.runningTime ?? 0}
                        />
                    </div>
                    {/* main */}
                </main>
            </div>
        </>
    );
}

// USEEFFECT FETCHING FALLBACK IN CASE PROBLEM WITH SWR OCCURS
// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const responseCDO = await fetch(
//                 "api/digitalInputs/fetchDigitalInputsCDO",
//                 {
//                     // next: {
//                     //     revalidate: 600
//                     // }
//                 }
//             );
//             const responseXR1 = await fetch(
//                 "api/digitalInputs/fetchDigitalInputsXR1",
//                 {
//                     // next: {
//                     //     revalidate: 600
//                     // }
//                 }
//             );
//             const responseXR2 = await fetch(
//                 "api/digitalInputs/fetchDigitalInputsXR2",
//                 {
//                     // next: {
//                     //     revalidate: 600
//                     // }
//                 }
//             );
//             const inputDataCDO = (await responseCDO.json()) as TestStatus[];
//             const inputDataXR1 = (await responseXR1.json()) as TestStatus[];
//             const inputDataXR2 = (await responseXR2.json()) as TestStatus[];

//             const responseOutputCDO = await fetch(
//                 "api/digitalOutputs/fetchDigitalOutputsCDO",
//                 {
//                     // next: {
//                     //     revalidate: 600
//                     // }
//                 }
//             );
//             const responseOutputXR1 = await fetch(
//                 "api/digitalOutputs/fetchDigitalOutputsXR1",
//                 {
//                     // next: {
//                     //     revalidate: 600
//                     // }
//                 }
//             );
//             const responseOutputXR2 = await fetch(
//                 "api/digitalOutputs/fetchDigitalOutputsXR2",
//                 {
//                     // next: {
//                     //     revalidate: 600
//                     // }
//                 }
//             );
//             const outputDataCDO =
//                 (await responseOutputCDO.json()) as TestStatus[];
//             const outputDataXR1 =
//                 (await responseOutputXR1.json()) as TestStatus[];
//             const outputDataXR2 =
//                 (await responseOutputXR2.json()) as TestStatus[];

//             // console.log(inputDataCDO)
//             // console.log(inputDataXR1)
//             // console.log(inputDataXR2)

//             setCDOData(inputDataCDO);
//             setXR1Data(inputDataXR1);
//             setXR2Data(inputDataXR2);

//             setCDODigitalOutputs(outputDataCDO);
//             setXR1DigitalOutputs(outputDataXR1);
//             setXR2DigitalOutputs(outputDataXR2);
//         } catch (error) {
//             <Link href="/settings" />;
//             console.error("Error fetching data:", error);
//         }
//     };

//     // Ensure that the page is already rendered before calling loading/error modal
//     if (document) {
//         if (document.body) {
//             if (!modalOpen) {
//                 document.body.style.overflow = "auto";
//             } else {
//                 document.body.style.overflow = "hidden";
//             }
//         }
//     }

//     const interval = setInterval(() => {
//         void fetchData();
//     }, 1000);

//     // setInterval(, 1000);
//     // void fetchData()
//     return () => clearInterval(interval);
//     // console.log("test data", testData);
// }, []);