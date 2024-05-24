import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeUserPass } from "~/server/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordChecker from "~/components/PasswordChecker";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

type ChangePass = z.infer<typeof ChangeUserPass>;

const NewPassword = () => {
    const [error, setErrors] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [userId, setUserId] = useState<number>(0);
    const { data: session } = useSession();

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const userData = api.account.findOne.useQuery(userId ?? 0);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ChangePass>({
        resolver: zodResolver(ChangeUserPass),
    });

    const [handleChangeConfirmPassword, setHandleChangedConfirmPassword] =
        useState<boolean>();

    const { mutate } = api.account.change.useMutation({
        onSuccess: () => {
            setSuccess("Successfully changed password!");
        },

        onError: (error) => {
            setError("currentPassword", {
                type: "custom",
                message: `${error.message}`,
            });
            // console.log(error.message)
            // console.log(error.data)
            // if (error.data == 404) {
            //     setError("currentPassword", { type: 'custom', message: `${error.message}` })
            // }
        },
    });

    useEffect(() => {
        console.log(session?.user?.id)

    })

    useEffect(() => {
        setUserId(session?.user?.id ?? 0);
    }, [session]);

    useEffect(() => {
        // console.log("conf pass: ", getValues("confirmPassword"));
    }, [getValues("confirmPassword")]);

    useEffect(() => {
        // console.log("handle confirm pass: ", handleChangeConfirmPassword);
    }, [handleChangeConfirmPassword]);

    // useEffect(() => {
    //     console.log(userData.data)
    // });

    async function onSubmit(user: ChangePass) {
        console.log(userId)

        console.log(userData.data?.oldPassword);
        mutate({
            ...user,
            id: userId,
            oldPassword: userData.data?.oldPassword,
        });

        reset();
        clearErrors();
    }

    // }
    return (
        <>
            <form
                className="flex flex-col gap-7 "
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-7 bg-base-100 p-7">
                    <div className="flex flex-col space-y-2 ">
                        <h2 className=" text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                            Old Password
                        </h2>
                        {/* Old Password */}
                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                            <input
                                id="OldPassword"
                                {...register("currentPassword")}
                                type="password"
                                name="currentPassword"
                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                placeholder="TYPE HERE..."
                            />
                        </label>
                        {errors?.currentPassword &&
                            watch().currentPassword.length < 1 ? (
                            <div
                                className={`max-h-96 space-y-2 rounded-md border border-[#b97c7c] bg-[#362626] p-4 text-xs font-normal text-[#b97c7c]`}
                            >
                                <p className={`flex items-center gap-2`}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height={"12"}
                                        fill="#F08288"
                                        viewBox="0 0 384 512">
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>
                                    {errors.currentPassword.message}
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="flex flex-row gap-7">
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
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height={"12"}
                                            fill="#F08288"
                                            viewBox="0 0 384 512">
                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                        </svg>
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
                                            setError("confirmPassword", {
                                                type: "custom",
                                            });
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
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height={"12"}
                                            fill="#F08288"
                                            viewBox="0 0 384 512">
                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                        </svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height={"12"}
                                            fill="#B4FFBC"
                                            viewBox="0 0 448 512">
                                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                        </svg>
                                        Password matches
                                    </p>
                                </div>
                            ) : (
                                <div
                                    className={`space-y-2 overflow-hidden rounded-md border-[#b97c7c] bg-[#362626] text-xs font-normal text-[#b97c7c] ${confirmPassword.length === 0 ? "max-h-0" : "max-h-96 border p-4"}`}
                                >
                                    <p className={`flex items-center gap-2`}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height={"12"}
                                            fill="#F08288"
                                            viewBox="0 0 384 512">
                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                        </svg>
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
                    </div>
                </div>
                {/* Form Buttons */}
                <div className="flex w-full flex-row gap-5">
                    {/* DISCARD BTN */}
                    <button
                        type="button"
                        onClick={() => reset()}
                        // onClick={props.closeModal}
                        className="h-[3rem] border-[1px] border-[#CCCCCC] px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] duration-200 hover:bg-[#424242] focus:bg-secondary"
                    // disabled={isSubmitting}
                    >
                        Discard Changes
                    </button>

                    {/* SAVE BTN */}
                    <button
                        type="submit"
                        // onClick={props.submitModal}
                        className="h-[3rem] border-[1px] border-success bg-success px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] text-white duration-200 hover:bg-[#5ec772] focus:bg-[#3d8b4b]"
                    // disabled={isSubmitting}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </>
    );
};

export default NewPassword;
