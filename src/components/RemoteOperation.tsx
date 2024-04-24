import { useEffect, useState } from "react";
import { RemoteOperationProps, TestStatus } from "~/utils/types";
import ModalVerification from "./ModalVerification";

const greenGlow =
    " flex h-full w-full flex-col space-y-1 rounded-xl border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] px-3 py-6 text-left tracking-widest text-[#B4FFBC] shadow-[0_0_10px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col space-y-1 rounded-xl border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] px-3 py-6 text-left tracking-widest text-[#FFCFD1] shadow-[0_0_10px_rgba(232,84,92,1)] ";
const optionUnselected =
    "flex h-full w-full flex-col space-y-1 rounded-xl bg-secondary px-3 py-6 text-left font-normal tracking-widest text-[#7E7E7E]";

const RemoteOperation = (props: RemoteOperationProps) => {
    const [selected, setSelected] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testDigitalOutputs, setTestDigitlOutputs] = useState<Array<TestStatus> | null>(null);

    // const openModal = () => {
    //     setModalOpen(true);
    //     document.body.style.overflow = "hidden";
    // };

    const generatorRemoteOperation = async (status: boolean) => {
        try {
            const response = await fetch("/api/setDigitalOutputValues",
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            value: status
                        }),
                    next: {
                        revalidate: 600
                    }
                });
            const jsonData = (await response.json()) as TestStatus[];


            setTestDigitlOutputs(jsonData)
            // console.log(testData);
            // console.log("aaa")
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const openModal = () => {
        if (!props.disabled) {
            // setSelected(index);
            setIsModalOpen(true); document.body.style.overflow = "hidden";

        }
    };

    const submitModal = (index: number) => {
        if (!props.disabled) {
            // setSelected(1);
            setIsModalOpen(false);
            document.body.style.overflow = "auto";

        }
    };

    return (
        <>
            {selected === 0 &&
                <ModalVerification
                    isModalOpen={isModalOpen}
                    modalTitle="Start Generator?"
                    modalStatus="ON"
                    submitModal={() => { setSelected(1); setIsModalOpen(false); document.body.style.overflow = "auto"; void generatorRemoteOperation(true) }}
                    closeModal={() => { setIsModalOpen(false); document.body.style.overflow = "auto"; }}
                />
            }

            {selected === 1 &&
                <ModalVerification
                    isModalOpen={isModalOpen}
                    modalTitle="Stop Generator?"
                    modalStatus="OFF"
                    submitModal={() => { setSelected(0); setIsModalOpen(false); document.body.style.overflow = "auto"; void generatorRemoteOperation(false) }}
                    closeModal={() => { setIsModalOpen(false); document.body.style.overflow = "auto"; }}
                />
            }
            <div className="flex w-full select-none flex-row items-center justify-center space-x-4 p-1 text-xs tracking-wider">
                {/* Handle Click for STOP button */}
                <div
                    // onClick={() => handleClick(0)}
                    onClick={() => {
                        openModal()
                    }}

                    className={
                        !props.disabled
                            // ? selected === 0
                            ? props.remoteOperationStatus === false
                                ? redGlow
                                : `${optionUnselected} cursor-pointer transition-all ease-in hover:bg-[#4B4B4B]`
                            : `${optionUnselected} cursor-not-allowed`
                    }
                >
                    <h2 className="uppercase">Diesel Generator</h2>
                    <h2 className="text-3xl font-semibold uppercase">Stop</h2>
                </div>

                {/* Handle Click for START button */}
                <div
                    // onClick={() => handleClick(1)}
                    onClick={() => {
                        openModal()
                    }}
                    className={
                        !props.disabled
                            // ? selected === 1
                            ? props.remoteOperationStatus === true
                                ? greenGlow
                                : `${optionUnselected} cursor-pointer transition-all ease-in hover:bg-[#4B4B4B]`
                            : `${optionUnselected} cursor-not-allowed`
                    }
                >
                    <h2 className="uppercase">Diesel Generator</h2>
                    <h2 className="text-3xl font-semibold uppercase">Start</h2>
                </div>
            </div>
        </>
    );
};

export default RemoteOperation;
