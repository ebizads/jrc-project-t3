import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import type { ModalForgotPassProps } from "~/utils/types";


const ModalForgotPass = (props: ModalForgotPassProps) => {
    const [error, setErrors] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [forgotPassInput, setForgotPassInput] = useState<string>("")
    const { mutate } = api.account.createForgotPassToken.useMutation({
        onSuccess: () => {
            props.closeModal()

            setSuccess("Successfully Started/Stopped Generator")
            setTimeout(() => setSuccess(null), 3000)
        },

        onError: (error) => {
            // errors2?.currentPassword ? showUserNotification("Error", errors2?.currentPassword?.message ?? "", true) : null
            setErrors(error.message)
            setTimeout(() => setErrors(null), 3000)
        },
    })


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
                                        {/* <i
                                            className={`fa-solid fa-circle-question pb-3 text-9xl ${statusColor}`}
                                        /> */}
                                        <h1
                                            // className={`pb-5 text-xl font-bold uppercase tracking-[0.2em] ${statusColor}`}
                                            className={`pb-5 text-xl font-bold uppercase tracking-[0.2em]`}

                                        >
                                            Forgot Password?
                                        </h1>
                                        <p className="pb-8 text-sm font-normal tracking-normal">
                                            Enter the User&apos;s Email or Username.
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
                                                    className=" grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                    placeholder="EMAIL/ USERNAME"
                                                    onChange={(event) => {
                                                        //set password for passwordchecker
                                                        // clearErrors()
                                                        const element = event.target as HTMLInputElement
                                                        setForgotPassInput(element.value)
                                                    }}
                                                />
                                            </label>

                                            {/* SUBMIT BTN */}

                                            <button
                                                type="submit"
                                                className="  h-[3rem] w-full bg-[#AD3339] px-[1rem] text-center text-xs tracking-[0.2em] duration-200 hover:bg-[#b34f54] focus:bg-[#84282d]"
                                                // disabled={isSubmitting}
                                                onClick={async () => {
                                                    mutate(forgotPassInput)
                                                }}
                                            >
                                                SUBMIT
                                                {/* {isSubmitting ? "LOADING..." : "LOGIN"} */}
                                            </button>

                                        </form>
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
                        </div>
                        {error && (
                            <div className="toast toast-end toast-bottom">
                                <div role="alert" className="alert alert-error">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 shrink-0 stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="toast toast-end toast-bottom">
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{success}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

function getStatusColor(modalStatus: string): string {
    let textColor: string;

    switch (modalStatus) {
        case "LOADING":
            textColor = "text-warning";
            break;
        case "ERROR":
            textColor = "text-error";
            break;
        default:
            textColor = "text-info";
            break;
    }
    return textColor;
}

export default ModalForgotPass
