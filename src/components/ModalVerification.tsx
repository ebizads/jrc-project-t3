import { useState } from "react";
import { ModalVerificationProps } from "~/utils/types";

const ModalVerification = (props: ModalVerificationProps) => {
    const statusColor = getStatusColor(props.modalStatus);

    // const [modalOpen, setModalOpen] = useState(false);

    // const openModal = () => {
    //     setModalOpen(true);
    //     document.body.style.overflow = "hidden";
    // };

    // const closeModal = () => {
    //     setModalOpen(false);
    //     document.body.style.overflow = "auto";
    // };

    return (
        <>
            {props.isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-black opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:h-screen sm:align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        {/* header and affects upper header colors */}
                        <div
                            className="inline-block w-full transform overflow-hidden rounded-lg bg-base-100 px-8 text-center align-middle shadow-xl transition-all sm:my-8 sm:max-w-lg"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-base-100 px-7 py-12 ">
                                <div className="flex items-center">
                                    <div className=" w-full text-center sm:mt-0 ">
                                        {/* Question Mark icon */}
                                        <i
                                            className={`fa-solid fa-circle-question pb-3 text-9xl ${statusColor}`}
                                        />
                                        <h1
                                            className={`pb-5 text-xl font-bold uppercase tracking-[0.2em] ${statusColor}`}
                                        >
                                            {props.modalTitle}
                                        </h1>
                                        <p className="pb-8 text-sm font-normal tracking-normal">
                                            You are about to turn the generator
                                            <span
                                                className={`font-semibold ${statusColor}`}
                                            >
                                                {" "}
                                                {props.modalStatus}
                                            </span>
                                            . If you wish to continue, please
                                            enter your account credentials
                                            below.
                                        </p>
                                        <form
                                            // onSubmit={handleSubmit(onSubmit)}
                                            className=" flex w-full flex-col gap-5"
                                        >
                                            {/* USERNAME */}
                                            <label className="input flex items-center gap-4 rounded-none bg-secondary pr-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="h-4 w-4 opacity-70"
                                                >
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                                </svg>
                                                <input
                                                    id="username"
                                                    type="text"
                                                    // {...register("username")}
                                                    className=" grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                    placeholder="USERNAME"
                                                />
                                            </label>

                                            {/* PASSWORD */}
                                            <label className="input flex items-center gap-4 rounded-none bg-secondary pr-0 ">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className=" h-4 w-4 bg-secondary opacity-70"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    // {...register("password")}
                                                    className=" grow rounded-none bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                    placeholder="PASSWORD"
                                                />
                                            </label>

                                            <div className="flex w-full flex-row gap-5">
                                                {/* CANCEL BTN */}
                                                <button
                                                    type="button"
                                                    onClick={props.closeModal}
                                                    className="h-[3rem] w-full border-[1px] border-[#CCCCCC] px-[1rem] text-center text-xs font-normal tracking-[0.2em] duration-200 hover:bg-[#424242] focus:bg-secondary"
                                                    // disabled={isSubmitting}
                                                >
                                                    CANCEL
                                                    {/* {isSubmitting
                                                    ? "LOADING..."
                                                    : "LOGIN"} */}
                                                </button>

                                                {/* SUBMIT BTN */}
                                                <button
                                                    type="button"
                                                    onClick={props.submitModal}
                                                    className="h-[3rem] w-full border-[1px] border-[#CCCCCC] bg-[#CCCCCC] px-[1rem] text-center text-xs font-normal tracking-[0.2em] text-base-300 duration-200 hover:bg-white focus:bg-info"
                                                    // disabled={isSubmitting}
                                                >
                                                    SUBMIT
                                                    {/* {isSubmitting
                                                    ? "LOADING..."
                                                    : "LOGIN"} */}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className=" bg-base-100 px-4 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={props.closeModal}
                                    className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                                >
                                    {/* unicode for X button */}
                                    &#10005;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

function getStatusColor(modalStatus: string): string {
    let textColor: string;

    switch (modalStatus) {
        case "ON":
            textColor = "text-success";
            break;
        case "OFF":
            textColor = "text-error";
            break;
        default:
            textColor = "text-info";
            break;
    }
    return textColor;
}

export default ModalVerification;
