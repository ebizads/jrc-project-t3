import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "~/server/schemas/user";
import { api } from "~/utils/api";

const runningTimeSchema = z.object({
    generatorId: z.number(),
    runningTime: z.number()
});

type EditRunningTime = z.infer<typeof runningTimeSchema>;
type User = z.infer<typeof loginSchema>;


const EditHoursButton = (props: {
    id: number,
    runningHours: number,
    degStatus: string,
    refetch: any,
    refetchLogs: any,
}) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [error, setErrors] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [runningTime, setRunningTime] = useState<number>(1000);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [inputRunningTime, setInputRunningTime] = useState<string>();
    const previousRunningTime = useRef<number>(0);
    previousRunningTime.current = props.runningHours

    const isPausedRef = useRef<boolean>(false);

    const { mutate: mutateLog } = api.generator.createLog.useMutation({
        onSuccess() {
            props.refetchLogs();
        },
    });

    const { mutate: mutateRunningTime } = api.generator.editGeneratorRunningTime.useMutation({
        onSuccess() {
            setOpenEdit(false)
            props.refetch()

        }
    })

    const { mutate } = api.account.findOneWithUsernamePassword.useMutation({
        // onError(error) {
        //     setErrors(error.message)
        //     setTimeout(() => setErrors(null), 3000)
        // },
        onSuccess() {

            mutateRunningTime({
                generatorId: props.id,
                runningTime: hrsToMs(inputRunningTime ?? "")
            })

            mutateLog({
                generatorId: props.id ?? 0,
                status: inputRunningTime ?? "",
                status_type: "info",
                status_msg: "Modified Running Time to ",
            });

            setIsModalOpen(false)
            isPausedRef.current = false

            setSuccess("Successfully Edited Running Time")
            setTimeout(() => setSuccess(null), 3000)
        },
    })



    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        clearErrors,
        formState: {
            errors,
            isSubmitting
        },
    } = useForm<User>({
        // resolver: zodResolver(runningTimeSchema), // Configuration the validation with the zod schema.
        defaultValues: {

        },
    });

    async function onSubmit(user: User) {
        console.log(user);
        mutate({ ...user });

        reset();
        clearErrors();
    }

    // converts time running data from database to hours
    function msToHour(duration: Number) {
        const hours = Number(duration) / 3600000

        return hours.toFixed(4);
    }


    // converts to milliseconds
    function hrsToMs(duration: string) {
        const milliseconds = Number(duration) * 3600000

        return milliseconds;
    }

    useEffect(() => {
        setInputRunningTime(msToHour(previousRunningTime.current))


        const interval = setInterval(() => {
            if (isPausedRef.current != true && props.degStatus === "GENERATING") {
                previousRunningTime.current = previousRunningTime.current + 60000
                setInputRunningTime(msToHour(previousRunningTime.current))
                mutateRunningTime({
                    generatorId: props.id,
                    runningTime: Number(previousRunningTime.current)
                })

                console.log(isPaused)
            }
            // }, 60000);
        }, 60000);


        return () => clearInterval(interval)


    }, [props.degStatus])

    return (
        <div
            className="flex w-full flex-col"
        >
            <h2 className=" pb-2 text-xs font-normal uppercase tracking-widest text-[#CCCCCC]">
                Running Hours
            </h2>

            {/* unopened edit */}
            {!openEdit && (
                <div className=" flex w-full select-none flex-row gap-2 rounded-full p-1 text-xs uppercase tracking-wider">
                    <div className="flex h-full w-4/6 flex-row justify-between rounded-full bg-secondary px-6 py-3 font-normal tracking-widest text-[#7E7E7E]">
                        <h2 className="text-white">{
                            // msToTime(previousRunningTime.current)
                            msToHour(previousRunningTime.current)
                        }</h2>
                        <h2>Hours</h2>
                    </div>
                    <button
                        className="flex h-full w-3/6 flex-row items-center justify-center gap-2 rounded-full border border-[#CCCCCC] p-3 text-center font-normal tracking-widest text-[#CCCCCC] transition-all duration-200 hover:bg-[#424242]"
                        onClick={(e) => {
                            setOpenEdit(true)
                            e.preventDefault()
                            isPausedRef.current = true
                            console.log(isPaused)
                        }}
                    >
                        <h2>EDIT TIME</h2>
                        <i className="fa-solid fa-pencil" />
                    </button>
                </div>
            )}

            {/* opened edit */}
            {openEdit && (
                <div
                    className=" flex w-full flex-row gap-2 rounded-full p-1 text-xs uppercase tracking-wider"

                >
                    <label className="input input-primary flex h-full w-4/6 flex-row justify-between rounded-full bg-[#4b4b4b] px-6 py-3 text-xs font-normal tracking-widest text-[#b1b1b1]">
                        <input
                            // type="number"
                            placeholder="TYPE HERE..."
                            // name="runningTime"
                            value={inputRunningTime}
                            className="w-3/5 text-white placeholder:text-xs placeholder:font-normal placeholder:tracking-widest placeholder:text-[#b1b1b1]"
                            onChange={(event) => {
                                setInputRunningTime(event.currentTarget.value)
                            }
                            }
                        />
                        <h2>Hours</h2>
                    </label>
                    <button
                        className="tooltip tooltip-error h-full w-1/6 items-center justify-center gap-2 rounded-full border border-[#FF9CA2] bg-[#462D2F] p-3 text-center font-normal tracking-widest text-[#F08288] transition-all duration-200 hover:bg-[#6f4d50]"
                        data-tip="DISCARD CHANGES"
                        onClick={(e) => {
                            setOpenEdit(false)
                            e.preventDefault()
                            isPausedRef.current = false
                        }
                        }
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                    <button
                        type="submit"
                        className="tooltip tooltip-success h-full w-1/6 items-center justify-center gap-2 rounded-full border border-[#9CFDA6] bg-[#38743e] p-3 text-center font-normal tracking-widest text-[#B4FFBC] transition-all duration-200 hover:bg-[#54a05c]"
                        data-tip="SAVE CHANGES"
                        onClick={() => {
                            setIsModalOpen(true)

                        }}
                    >
                        <i className="fa-solid fa-check" />
                    </button>
                </div>
            )
            }

            {
                isModalOpen && (
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
                                                className={`fa-solid fa-circle-question pb-3 text-9xl text-info`}
                                            />
                                            <h1
                                                className={`pb-5 text-xl font-bold uppercase tracking-[0.2em] text-info`}
                                            >
                                                EDIT RUNNING TIME?
                                            </h1>
                                            {/* <p className="pb-8 text-sm font-normal tracking-normal">
                                            You are about to edit the running time 
                                            <span
                                                className={`font-semibold text-info`}
                                            > */}
                                            {" "}
                                            {/* {props.modalStatus} */}
                                            {/* </span>
                                        </p> */}
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
                                                        onClick={() => setIsModalOpen(false)}
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
                                        onClick={() => setIsModalOpen(false)}
                                        className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                                    >
                                        {/* unicode for X button */}
                                        &#10005;
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                )
            }

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
        </div >
    );
};

export default EditHoursButton;

// function msToTime(duration: Number) {
//     let milliseconds = Math.floor((Number(duration) % 1000) / 100);
//     let seconds = Math.floor((Number(duration) / 1000) % 60);
//     let minutes = Math.floor((Number(duration) / (1000 * 60)) % 60);
//     let hours = Math.floor((Number(duration) / (1000 * 60 * 60)) % 24);

//     const hoursString = (hours < 10) ? "0" + hours : hours;
//     const minutesString = (minutes < 10) ? "0" + minutes : minutes;
//     const secondsString = (seconds < 10) ? "0" + seconds : seconds;

//     return hoursString + ":" + minutesString + ":" + secondsString + "." + milliseconds;
// }