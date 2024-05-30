import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "~/server/schemas/user";
import { api } from "~/utils/api";
import { getStatusDEG } from "~/utils/functions";
import type { ModalVerificationProps, TestStatus } from "~/utils/types";

type User = z.infer<typeof loginSchema>;

const ModalVerification = (props: ModalVerificationProps) => {
    const [error, setErrors] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const statusColor = getStatusColor(props.modalStatus);
    const [testDigitalOutputs, setTestDigitalOutputs] = useState<Array<TestStatus> | null>(null);

    // const [modalOpen, setModalOpen] = useState(false);

    // const openModal = () => {
    //     setModalOpen(true);
    //     document.body.style.overflow = "hidden";
    // };

    // const closeModal = () => {
    //     setModalOpen(false);
    //     document.body.style.overflow = "auto";
    // };
    const { mutate: mutateLogs } = api.generator.createLog.useMutation({
        // async onSuccess() {
        // },
    });

    const { mutate } = api.account.findOneWithUsernamePassword.useMutation({
        onError(error) {
            setErrors(error.message)
            setTimeout(() => setErrors(null), 3000)
        },
        onSuccess() {
            props.submitModal()
            if (props.modalStatus == "ON") {
                {/* turn generator ON */ }
                void generatorRemoteOperation(true, props.generatorId, true)
                // CREATE STATUS LOG WHEN STARTED
                mutateLogs({
                    generatorId: props.generatorId ?? 0,
                    status: getStatusDEG(true),
                    status_type: "success",
                    status_msg: "Diesel Generator remote operation",
                });
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                props.refetch();

            } else {
                void generatorRemoteOperation(true, props.generatorId, false)
                // CREATE STATUS LOG WHEN STOPPED
                mutateLogs({
                    generatorId: props.generatorId ?? 0,
                    status: getStatusDEG(false),
                    status_type: "success",
                    status_msg: "Diesel Generator remote operation",
                });
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                props.refetch();

            }
            setSuccess("Successfully Started/Stopped Generator")
            setTimeout(() => setSuccess(null), 3000)
        },
    })

    const {
        register,
        handleSubmit,
        watch,
        reset,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<User>({
        // resolver: zodResolver(userSchema), // Configuration the validation with the zod schema.
        defaultValues: {
            // username: "",
            // password: "",
        },
    });

    const generatorRemoteOperation = async (status: boolean, generatorId: number, ifStart: boolean) => {
        try {
            let apiRoute = "";
            switch (generatorId) {
                case 1:
                    switch (ifStart) {
                        case true:
                            apiRoute = "api/setDigitalOutputs/setDigitalOutputValuesCDO-START";
                            // console.log("START" + ifStart)
                            break;
                        case false:
                            apiRoute = "api/setDigitalOutputs/setDigitalOutputValuesCDO-STOP";
                            // console.log("STOP" + ifStart)
                            break;
                    }
                    break;
                case 2:
                    switch (ifStart) {
                        case true:
                            apiRoute = "api/setDigitalOutputs/setDigitalOutputValuesXR1-START";
                            break;
                        case false:
                            apiRoute = "api/setDigitalOutputs/setDigitalOutputValuesXR1-STOP";
                            break;
                    }
                    break;
                case 3:
                    switch (ifStart) {
                        case true:
                            apiRoute = "api/setDigitalOutputs/setDigitalOutputValuesXR2-START";
                            break;
                        case false:
                            apiRoute = "api/setDigitalOutputs/setDigitalOutputValuesXR2-STOP";
                            break;
                    }
                    break;
            }
            const response = await fetch(apiRoute,
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

            if (response.status == 200) {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setTimeout(async () => {
                    await fetch(apiRoute,
                        {
                            method: 'POST',
                            body: JSON.stringify(
                                {
                                    value: !status
                                }),
                            next: {
                                revalidate: 600
                            }
                        });

                },
                    //SET STATE TO FALSE AGAIN AFTER 760 ms
                    760)
            }
            const jsonData = (await response.json()) as TestStatus[];


            setTestDigitalOutputs(jsonData)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    async function onSubmit(user: User) {
        console.log(user);
        mutate({ ...user });

        reset();
        clearErrors();
    }

    return (
        <>
            {props.isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:p-0">
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
                                    <div className=" w-full text-center sm:mt-0 flex flex-col items-center justify-center ">
                                        {/* Question Mark icon */}
                                        <svg width="184" preserveAspectRatio="xMinYMin" height="184" viewBox="0 0 184 184" fill={statusColor} xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1422_1490)">
                                                <path d="M92 184C116.4 184 139.8 174.307 157.054 157.054C174.307 139.8 184 116.4 184 92C184 67.6001 174.307 44.1995 157.054 26.9462C139.8 9.69283 116.4 0 92 0C67.6001 0 44.1995 9.69283 26.9462 26.9462C9.69283 44.1995 0 67.6001 0 92C0 116.4 9.69283 139.8 26.9462 157.054C44.1995 174.307 67.6001 184 92 184ZM61.0219 59.4047C63.8609 51.3906 71.4797 46 79.9969 46H100.948C113.491 46 123.625 56.1703 123.625 68.6766C123.625 76.7984 119.277 84.3094 112.233 88.3703L100.625 95.0187C100.553 99.6906 96.7078 103.5 92 103.5C87.2203 103.5 83.375 99.6547 83.375 94.875V90.0234C83.375 86.9328 85.0281 84.0938 87.7234 82.5484L103.644 73.4203C105.333 72.45 106.375 70.6531 106.375 68.7125C106.375 65.6937 103.931 63.2859 100.948 63.2859H79.9969C78.775 63.2859 77.6969 64.0406 77.3016 65.1906L77.1578 65.6219C75.5766 70.1141 70.6172 72.45 66.1609 70.8688C61.7047 69.2875 59.3328 64.3281 60.9141 59.8719L61.0578 59.4406L61.0219 59.4047ZM80.5 126.5C80.5 123.45 81.7116 120.525 83.8683 118.368C86.0249 116.212 88.95 115 92 115C95.05 115 97.9751 116.212 100.132 118.368C102.288 120.525 103.5 123.45 103.5 126.5C103.5 129.55 102.288 132.475 100.132 134.632C97.9751 136.788 95.05 138 92 138C88.95 138 86.0249 136.788 83.8683 134.632C81.7116 132.475 80.5 129.55 80.5 126.5Z" fill="#4BA45C" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1422_1490">
                                                    <rect width="184" height="184" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <h1
                                            className={`py-5 text-xl font-bold uppercase tracking-[0.2em] ${statusColor}`}
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
                                            onSubmit={handleSubmit(onSubmit)}
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
                                                    {...register("username")}
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
                                                    {...register("password")}
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
                                                    type="submit"
                                                    // onClick={props.submitModal}
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
