import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeUserPass } from "~/server/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordChecker from "~/components/PasswordChecker";

type ChangePass = z.infer<typeof ChangeUserPass>;

const NewPassword = () => {
    const [password, setPassword] = useState<String>("");
    const [confirmPassword, setConfirmPassword] = useState<String>("");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ChangePass>({
        resolver: zodResolver(ChangeUserPass),
    });

    const [handleChangeConfirmPassword, setHandleChangedConfirmPassword] =
        useState<boolean>();

    useEffect(() => {
        // console.log("conf pass: ", getValues("confirmPassword"));
    }, [getValues("confirmPassword")]);

    useEffect(() => {
        // console.log("handle confirm pass: ", handleChangeConfirmPassword);
    }, [handleChangeConfirmPassword]);

    return (
        <>
            <div className="flex flex-row gap-7">
                {/* New Password */}
                <div className="flex w-full flex-col space-y-2">
                    <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                        New Password
                    </h2>
                    <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                        <input
                            id="NewPassword"
                            type="password"
                            name="password"
                            className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                            placeholder="TYPE HERE..."
                            onChange={(event) => {
                                setValue("password", event.currentTarget.value);
                                setPassword(event.currentTarget.value);

                                if (
                                    getValues("password") ==
                                    getValues("confirmPassword")
                                ) {
                                    // console.log("password matches!");
                                    setHandleChangedConfirmPassword(true);
                                } else {
                                    // console.log("password do not match!");
                                    setHandleChangedConfirmPassword(false);
                                }
                                // console.log(password);
                            }}
                        />
                    </label>
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
                            name="confirmPassword"
                            className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d] "
                            placeholder="TYPE HERE..."
                            onChange={(event) => {
                                setValue(
                                    "confirmPassword",
                                    event?.currentTarget.value
                                );
                                setConfirmPassword(event.currentTarget.value);

                                if (
                                    getValues("confirmPassword") ==
                                    getValues("password")
                                ) {
                                    // console.log("password matches!");
                                    setHandleChangedConfirmPassword(true);
                                } else {
                                    // console.log("password do not match!");
                                    setHandleChangedConfirmPassword(false);
                                }
                                // console.log(password);
                            }}
                        />
                    </label>

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
                </div>
            </div>
        </>
    );
};

export default NewPassword;
