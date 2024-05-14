import Image from "next/image"
import { useRouter } from "next/router"

const ResetPassError = () => {
    const router = useRouter()
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

                        </div>

                        <div
                            className=" flex w-full flex-col gap-5 text-white items-center"
                        >
                            <h2 className="text-sm text-center font-normal uppercase tracking-[0.2em]">
                                This link has already expired or have been used!
                            </h2>
                            {/* HOME BTN */}
                            <button
                                className=" w-3/4 h-[3rem] bg-[#AD3339] px-[1rem] text-center text-xs tracking-[0.2em] duration-200 hover:bg-[#b34f54] focus:bg-[#84282d]"
                                onClick={() => {
                                    void router.push('/')
                                }}
                            >
                                HOME
                            </button>


                        </div>


                    </div>
                </div>
            </div>
        </main>
    );
}

export default ResetPassError