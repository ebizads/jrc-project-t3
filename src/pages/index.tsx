import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const userSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }).trim(),
    password: z
        .string()
        .min(1, { message: "The password is invalid" })
        .max(20, { message: "The password is invalid" }),
})

// Infer the TS type according to the zod schema.
type User = z.infer<typeof userSchema>

const LoginForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    function onRegister() {
        router.push("UserManagement/register")
    }
    //get client ip address
    // const { data } = useQuery(["ip"], async () => {
    //   return await fetch("/api/ip").then((res) => res.json())
    // })

    //get user
    // const { data: session, status } = useSession()

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
    })

    // const [formError, setFormError] = useState<boolean>(false)
    // useEffect(() => {
    //   setFormError(Object.keys(errors).length > 0 ? true : false)
    // }, [errors])

    let [openForgetPass, setOpenForgetPass] = useState<boolean>(false)
    let [openVerification, setOpenVerificatiion] = useState<boolean>(false)

    // The onSubmit function is invoked by RHF only if the validation is OK.
    const onSubmit = async (user: User) => {
        // Login function
        // console.log(user)

        const res = await signIn("credentials", {
            redirect: false,
            username: user.username,
            password: user.password,

            callbackUrl: "/dashboard",
        })

        setError(res?.error as string)
        if (res?.error) {
            console.log("May error ", res?.error)
        } else {
            router.push(res?.url as string)
        }
    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <div className="flex flex-col w-[65%] h-full space-y-8 justify-center">
                <h1 className="text-center font-bold leading-normal text-navyblue-50 md:text-[1.5rem]">
                    JRC ADMIN DASHBOARD LOGIN
                </h1>
                {/* {Boolean(Object.keys(errors)?.length) && (
                    <Alert clearErrors={clearErrors}>There are errors in the form.</Alert>
                )} */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center space-y-4 w-100 w-100"
                >
                    <div className="w-full">
                        <input id="username" type="text" {...register("username")}></input>
                    </div>
                    <div className="w-full">
                        <input id="password" type="password" {...register("password")}></input>
                    </div>
                    <div className="w-full flex flex-row  items-center place-content-evenly ">
                        Forgot Password?
                        <a
                            className="text-xs text-navyblue-400 "
                            href="#"
                            onClick={() => setOpenForgetPass(true)}
                        >
                            Click Here
                        </a>
                    </div>

                    <div className="w-full h-full text-center">
                        <button
                            type="submit"
                            className=" rounded-3xl text-xs w-1/2 bg-navyblue-50 px-4 py-2 font-medium text-white duration-150 hover:bg-white hover:border hover:border-navyblue-50 hover:text-navyblue-50 disabled:bg-gray-300 disabled:text-gray-500"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Loading..." : "Login"}
                        </button>
                    </div>
                </form>


                {error && (
                    <div className="text-wrap mt-2 font-sans text-sm italic text-red-500">
                        {error}
                    </div>
                )}
            </div>


            {/* <Modal
          isVisible={openVerification}
          setIsVisible={setOpenVerificatiion}
          className="px-20 py-8 w-[500px]"
        >
          <Verify ></Verify>
        </Modal> */}
        </div>

    )
}


const Login = () => {
    return (
        <div className="h-full">
            <LoginForm></LoginForm>
        </div>
    )
}

export default Login