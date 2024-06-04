import { useEffect, useState } from "react";
import { RemoteOperationProps, TestStatus } from "~/utils/types";
import ModalVerification from "./ModalVerification";
import { api } from "~/utils/api";
import { Familjen_Grotesk } from "next/font/google";
import { useSession } from "next-auth/react";

const greenGlow =
    " flex h-full w-full flex-col space-y-1 rounded-xl border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] px-3 py-6 text-left tracking-widest text-[#B4FFBC] shadow-[0_0_10px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col space-y-1 rounded-xl border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] px-3 py-6 text-left tracking-widest text-[#FFCFD1] shadow-[0_0_10px_rgba(232,84,92,1)] ";
const yellowGlow =
    " flex h-full w-full flex-col space-y-1 rounded-xl border-2 border-[#FFFA8B] bg-gradient-to-b from-[#434336] to-[#7F7B2D] px-3 py-6 text-left tracking-widest text-[#FFFA8B] shadow-[0_0_8px_rgba(255,250,139,1)] ";
const optionUnselected =
    "flex h-full w-full flex-col space-y-1 rounded-xl bg-secondary px-3 py-6 text-left font-normal tracking-widest text-[#7E7E7E]";

const RemoteOperation = (props: RemoteOperationProps) => {
    const [selected, setSelected] = useState(props.remoteOperationStatus);
    const [disableButtonsTimeout, setDisableButtonsTimeout] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession()
    // const openModal = () => {
    //     setModalOpen(true);
    //     document.body.style.overflow = "hidden";
    // };
    useEffect(() => {
        setSelected(props.remoteOperationStatus)
    }, [props.remoteOperationStatus, setSelected])

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

    const setButtonTimeout = () => {
        setDisableButtonsTimeout(true)
        setTimeout(() => setDisableButtonsTimeout(false), 3000)
    }

    return (
        <>
            {selected != true &&
                <ModalVerification
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    refetch={props.refetch}
                    generatorId={props.generatorId}
                    isModalOpen={isModalOpen}
                    modalTitle="Start Generator?"
                    modalStatus="ON"
                    submitModal={() => { setButtonTimeout(); setSelected(props.remoteOperationStatus); setIsModalOpen(false); document.body.style.overflow = "auto"; }}
                    closeModal={() => { setIsModalOpen(false); document.body.style.overflow = "auto"; }}
                />
            }

            {selected != false &&
                <ModalVerification
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    refetch={props.refetch}
                    generatorId={props.generatorId}
                    isModalOpen={isModalOpen}
                    modalTitle="Stop Generator?"
                    modalStatus="OFF"
                    submitModal={() => { setButtonTimeout(); setSelected(props.remoteOperationStatus); setIsModalOpen(false); document.body.style.overflow = "auto"; }}
                    closeModal={() => { setIsModalOpen(false); document.body.style.overflow = "auto"; }}
                />
            }
            <div className={`flex w-full select-none flex-row items-center justify-center space-x-4 p-1 text-xs tracking-wider ${session?.user?.type == "Viewer" && ('pointer-events-none')}`}>
                {/* Handle Click for STOP button */}
                <button
                    // disabled={disableButtonsTimeout || props.remoteOperationStatus == false}
                    disabled={props.remoteOperationStatus == false}
                    // onClick={() => handleClick(0)}
                    onClick={() => {
                        openModal()
                    }}
                    className={
                        !props.disabled
                            // if not disabled
                            // if generator is stopped
                            ? props.remoteOperationStatus == false
                                // glow red
                                ? redGlow
                                // selectable
                                : disableButtonsTimeout ?
                                    `${optionUnselected} cursor-not-allowed` :
                                    `${optionUnselected} cursor-pointer transition-all ease-in hover:bg-[#4B4B4B]`
                            :
                            // if disabled
                            // if generator stopped 
                            props.remoteOperationStatus == false ?
                                props.standby == true ? `${optionUnselected} cursor-not-allowed`
                                    : `${redGlow}`
                                : `${optionUnselected} cursor-not-allowed`
                    }
                >
                    <h2 className="uppercase">Diesel Generator</h2>
                    <h2 className="text-3xl font-semibold uppercase">Stop</h2>
                </button>

                {/* Handle Click for START button */}
                <button
                    // disabled={disableButtonsTimeout || props.remoteOperationStatus == true}
                    disabled={props.remoteOperationStatus == true}
                    // onClick={() => handleClick(1)}
                    onClick={() => {
                        openModal()
                    }}
                    className={
                        !props.disabled
                            // if not disabled
                            // if generator is started
                            ? props.remoteOperationStatus == true
                                // glow red
                                ? greenGlow
                                // selectable
                                : disableButtonsTimeout ?
                                    `${optionUnselected} cursor-not-allowed` :
                                    `${optionUnselected} cursor-pointer transition-all ease-in hover:bg-[#4B4B4B]`
                            :
                            // if disabled
                            // if generator started
                            props.remoteOperationStatus == true ?
                                props.standby == true ? `${optionUnselected} cursor-not-allowed`
                                    : `${greenGlow} cursor-not-allowed`
                                : `${optionUnselected} cursor-not-allowed`
                    }
                >
                    <h2 className="uppercase">Diesel Generator</h2>
                    <h2 className="text-3xl font-semibold uppercase">Start</h2>
                </button>
            </div>
        </>
    );
};

export default RemoteOperation;
