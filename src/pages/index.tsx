import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

const userSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }).trim(),
    password: z
        .string()
        .min(1, { message: "The password is invalid" })
        .max(20, { message: "The password is invalid" }),
});

// Infer the TS type according to the zod schema.
type User = z.infer<typeof userSchema>;

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    async function onRegister() {
        await router.push("UserManagement/register");
    }

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<User>({
        // resolver: zodResolver(userSchema), // Configuration the validation with the zod schema.
        defaultValues: {
            // username: "",
            // password: "",
        },
    });

    const [openForgetPass, setOpenForgetPass] = useState<boolean>(false);
    const [openVerification, setOpenVerificatiion] = useState<boolean>(false);

    // The onSubmit function is invoked by RHF only if the validation is OK.
    const onSubmit = async (user: User) => {
        // Login function
        // console.log(user)

        const res = await signIn("credentials", {
            redirect: false,
            username: user.username,
            password: user.password,

            callbackUrl: "/dashboard",
        });

        if (res?.error) setError(res?.error);
        if (res?.error) {
            console.log("May error ", res?.error);
        } else {
            if (res?.url) await router.push(res?.url);
        }
    };

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

                        <div className="gap-2 text-center">
                            <h1 className="text-2xl font-semibold uppercase tracking-[0.2em]">
                                Admin Dashboard Login
                            </h1>
                            <h2 className="text-sm font-normal uppercase tracking-[0.2em]">
                                Monitoring & Controlling System
                            </h2>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className=" flex w-full flex-col gap-5"
                        >
                            {/* USERNAME */}
                            <label className="input flex items-center gap-4 rounded-none bg-secondary ">
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
                                    className="grow text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                    placeholder="USERNAME"
                                />
                            </label>

                            {/* PASSWORD */}
                            <label className="input flex items-center gap-4 rounded-none bg-secondary ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70"
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
                                    className="grow text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                    placeholder="PASSWORD"
                                />
                            </label>

                            {/* SUBMIT BTN */}
                            <button
                                type="submit"
                                className="  h-[3rem] w-full bg-[#AD3339] px-[1rem] text-center text-xs tracking-[0.2em] duration-200 hover:bg-[#b34f54] focus:bg-[#84282d]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "LOADING..." : "LOGIN"}
                            </button>

                            <div className="flex w-full flex-row items-center justify-center gap-1 ">
                                Forgot Password?
                                <a
                                    className=" text-[#AD3339] duration-200 hover:text-[#b34f54] hover:underline focus:text-[#84282d]"
                                    href="#"
                                    onClick={() => setOpenForgetPass(true)}
                                >
                                    Click Here.
                                </a>
                            </div>
                        </form>
                        {error && (
                            <div className="toast toast-end toast-top">
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

const Login = () => {
    return (
        <div className="h-full">
            <LoginForm></LoginForm>
        </div>
    );
};

export default Login;
