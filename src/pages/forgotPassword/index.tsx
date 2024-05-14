import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { ResetForgotPass } from "~/server/schemas/user";
import { api } from "~/utils/api";
import PasswordChecker from "~/components/PasswordChecker";
import { useSafePush, useSafeReplace } from "~/utils/safe-push";
import { zodResolver } from "@hookform/resolvers/zod";

// Infer the TS type according to the zod schema.
type ChangePass = z.infer<typeof ResetForgotPass>;


const ForgotPassword = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const { safePush } = useSafePush()
    const { safeReplace } = useSafeReplace()

    const queryEmail = String(router.query.email)
    const queryToken = String(router.query.token)

    const { data: userData, refetch } = api.account.findOneEmailOrToken.useQuery({
        token: queryToken,
        email: queryEmail
    })

    const { mutate } = api.account.resetForgotPass.useMutation({
        onSuccess: async () => {
            reset()

            setSuccess("Successfully changed password.")
            setTimeout(() => {
                setSuccess(null)
                void router.replace({
                    pathname: "/",
                })
            }
                , 3000)

        },

        onError: (error) => {
            // setError2("currentPassword", { type: 'custom', message: `${error.message}` })
            console.log(error.message)
        },
    })

    useEffect(() => {
        console.log(queryToken)
        console.log(queryEmail)
        if (
            queryEmail == null ||
            queryEmail == "undefined" ||
            queryToken == null ||
            queryToken == "undefined"
        ) {
            safeReplace(`/`)
        }
    }, [])


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        clearErrors,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ChangePass>({
        resolver: zodResolver(ResetForgotPass), // Configuration the validation with the zod schema.
        defaultValues: {
            // username: "",
            // password: "",
        },
    });


    const [handleChangeConfirmPassword, setHandleChangedConfirmPassword] =
        useState<boolean>();

    // The onSubmit function is invoked by RHF only if the validation is OK.
    async function onSubmitChangePass(passwordInfo: ChangePass) {
        console.log(passwordInfo);
        console.log(userData)
        mutate({
            ...passwordInfo,
            id: userData?.id,
            oldPassword: userData?.oldPassword,
        });

        reset();
        clearErrors();
    }

    return (
        <main className="flex min-h-screen flex-col bg-[#202020] bg-[url('/loginBG.svg')] bg-cover bg-center bg-no-repeat py-4">
            <div className="table absolute -top-20 left-0 flex h-full w-full justify-center">
                <div className="table-cell align-middle">
                    <div className=" mx-auto grid w-[60%] grid-rows-1 gap-6 xl:w-[35%]">
                        <div className="flex w-full justify-center">
                            <Image
                                src="/jrc-icon.svg"
                                width={150}
                                height={200}
                                alt="JRC Logo"
                                className="-mb-8"
                            />
                        </div>

                        <div className="gap-2 text-center text-white">
                            <h1 className="text-2xl font-semibold uppercase tracking-[0.2em]">
                                Reset Password
                            </h1>
                            {/* <h2 className="text-sm font-normal uppercase tracking-[0.2em]">
                                Monitoring & Controlling System
                            </h2> */}
                        </div>

                        <form
                            className="flex flex-col gap-7 "
                            onSubmit={handleSubmit(onSubmitChangePass)}
                        >
                            {/* New Password */}
                            <div className="flex w-full flex-col space-y-2">
                                <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                    New Password
                                </h2>
                                <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                    <input
                                        id="NewPassword"
                                        {...register("password")}
                                        type="password"
                                        name="password"
                                        className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                        placeholder="TYPE HERE..."
                                        onChange={(event) => {
                                            setValue(
                                                "password",
                                                event.currentTarget.value
                                            );
                                            setPassword(event.currentTarget.value);

                                            if (
                                                getValues("password") ==
                                                getValues("confirmPassword")
                                            ) {
                                                // console.log("password matches!");
                                                setHandleChangedConfirmPassword(
                                                    true
                                                );
                                            } else {
                                                // console.log("password do not match!");
                                                setHandleChangedConfirmPassword(
                                                    false
                                                );
                                            }
                                        }}
                                    />
                                </label>

                                {errors?.password && password.length < 1 ? (
                                    <div
                                        className={`max-h-96 space-y-2 overflow-hidden rounded-md border border-[#b97c7c] bg-[#362626] p-4 text-xs font-normal text-[#b97c7c]`}
                                    >
                                        <p className={`flex items-center gap-2`}>
                                            <i className={`fa-solid fa-xmark`} />
                                            {errors.password.message}
                                        </p>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {password && (
                                    <PasswordChecker password={watch().password} />
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="flex w-full flex-col space-y-2">
                                <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                    Confirm Password
                                </h2>
                                <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                    <input
                                        id="ConfirmPassword"
                                        type="password"
                                        {...register("confirmPassword")}
                                        name="confirmPassword"
                                        className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d] "
                                        placeholder="TYPE HERE..."
                                        onChange={(event) => {
                                            setValue(
                                                "confirmPassword",
                                                event?.currentTarget.value
                                            );
                                            setConfirmPassword(
                                                event.currentTarget.value
                                            );

                                            if (
                                                getValues("confirmPassword") ==
                                                getValues("password")
                                            ) {
                                                // console.log("password matches!");
                                                setHandleChangedConfirmPassword(
                                                    true
                                                );
                                            } else {
                                                // console.log("password do not match!");
                                                setHandleChangedConfirmPassword(
                                                    false
                                                );
                                                // setError("confirmPassword", {
                                                //     type: "custom",
                                                // });
                                            }
                                            // console.log(password);
                                        }}
                                    />
                                </label>

                                {errors?.confirmPassword &&
                                    watch().confirmPassword.length < 1 ? (
                                    <div
                                        className={`max-h-96 space-y-2 rounded-md border border-[#b97c7c] bg-[#362626] p-4 text-xs font-normal text-[#b97c7c]`}
                                    >
                                        <p className={`flex items-center gap-2`}>
                                            <i className={`fa-solid fa-xmark`} />
                                            {errors.confirmPassword.message}
                                        </p>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {confirmPassword != "" &&
                                    handleChangeConfirmPassword == true ? (
                                    <div
                                        className={`space-y-2 overflow-hidden rounded-md border-[#7cb987] bg-[#283626] text-xs font-normal text-[#7cb987] ${confirmPassword.length === 0 ? "max-h-0" : "max-h-96 border p-4"}`}
                                    >
                                        <p
                                            className={`flex items-center gap-2 text-[#7cb987]`}
                                        >
                                            <i className={`fa-solid fa-check`} />
                                            Password matches
                                        </p>
                                    </div>
                                ) : (
                                    <div
                                        className={`space-y-2 overflow-hidden rounded-md border-[#b97c7c] bg-[#362626] text-xs font-normal text-[#b97c7c] ${confirmPassword.length === 0 ? "max-h-0" : "max-h-96 border p-4"}`}
                                    >
                                        <p className={`flex items-center gap-2`}>
                                            <i className={`fa-solid fa-xmark`} />
                                            Password does not match
                                        </p>
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
                                            <span>{success}</span>
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* SAVE BTN */}
                            <button
                                type="submit"
                                className="  h-[3rem] w-full bg-[#AD3339] px-[1rem] text-center text-xs tracking-[0.2em] duration-200 hover:bg-[#b34f54] focus:bg-[#84282d]"
                            >
                                Save Changes
                            </button>
                        </form>

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
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;