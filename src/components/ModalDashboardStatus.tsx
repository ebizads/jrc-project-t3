import { useState } from "react";
import { ModalDashboardStatusProps } from "~/utils/types";

const ModalDashboardStatus = (props: ModalDashboardStatusProps) => {
    const [statusColor, modalTitle, promptText, modalIcon] = getModalStatusType(
        props.modalStatus
    );

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
                                        {modalIcon}
                                        <h1
                                            className={`pb-5 text-xl font-bold uppercase tracking-[0.2em] ${statusColor}`}
                                        >
                                            {modalTitle}
                                        </h1>
                                        {promptText}
                                        {/* <div className=" bg-base-100 px-4 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                // onClick={props.closeModal}
                                                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                                            > */}
                                                {/* unicode for X button */}
                                                {/* &#10005; */}
                                            {/* </button>
                                        </div> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

function getModalStatusType(
    modalStatus: string
): [string, string, JSX.Element, JSX.Element] {
    let textColor: string;
    let modalTitle: string;
    let promptText: JSX.Element;
    let modalIcon: JSX.Element;

    switch (modalStatus) {
        case "LOADING":
            textColor = "text-warning";
            modalTitle = "Loading Dashboard Data";
            promptText = (
                <p className="text-sm font-normal tracking-normal">
                    The dashboard data is currently
                    <span className={`font-semibold text-warning`}>
                        {" "}
                        {modalStatus}
                    </span>
                    . Please wait while the data is being retrieved. Should you
                    have additional concerns, please contact the system
                    administrator.
                </p>
            );
            modalIcon = (
                <span className="loading loading-spinner mb-6 w-[4.5rem] text-warning" />
            );
            break;
        case "ERROR":
            textColor = "text-error";
            modalTitle = "Error Fetching Data";
            promptText = (
                <p className="text-sm font-normal tracking-normal">
                    There is an
                    <span className={`font-semibold text-error`}>
                        {" "}
                        {modalStatus}{" "}
                    </span>
                    with loading the dashboard data. Please ensure proper
                    connection between the SNAP PAC System and Generator. Should
                    you have additional concerns, please contact the system
                    administrator.
                </p>
            );
            modalIcon = (
                <i className="fa-solid fa-triangle-exclamation pb-3 text-9xl text-error" />
            );
            break;
        case "FAILED":
            textColor = "text-error";
            modalTitle = "Generator Failure";
            promptText = (
                <p className="text-sm font-normal tracking-normal">
                    Please check generator set to confirm the problem.
                </p>
            );
            modalIcon = (
                <i className="fa-solid fa-triangle-exclamation pb-3 text-9xl text-error" />
            );
            break;
        default:
            textColor = "text-info";
            modalTitle = " ";
            promptText = (
                <p className="text-sm font-normal tracking-normal">&quot; &quot;</p>
            );
            modalIcon = (
                <i className="fa-solid fa-circle-question pb-3 text-9xl text-info" />
            );
            break;
    }
    return [textColor, modalTitle, promptText, modalIcon];
}

export default ModalDashboardStatus;
