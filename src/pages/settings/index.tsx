import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import NewPassword from "~/components/NewPassword";
import { ChangeDashboardSettings, ChangeGeneratorSettings } from "~/server/schemas/generator";
import { api } from "~/utils/api";


type GeneratorSettings = z.infer<typeof ChangeGeneratorSettings>;
type DashboardSettings = z.infer<typeof ChangeDashboardSettings>;

const selectedTabStyle =
    "border-b-[3px] border-[#DC000C] text-[#DC000C] cursor-default";

export default function Settings() {
    const ref = useRef(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { mutate } = api.generator.changeGeneratorSettings.useMutation({
        onSuccess() {
            refetch()
            setSuccess("Successfully configured Generator Settings")
            setTimeout(() => setSuccess(null), 3000)
        }
    })

    const { mutate: mutateDashboard } = api.generator.changeDashboardTitle.useMutation({
        onSuccess() {
            refetch()
            setSuccess("Successfully configured Dashboard Settings")
            setTimeout(() => setSuccess(null), 3000)
        }

    })

    const { data, refetch } = api.generator.findAllGenerators.useQuery({})

    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const {
        control: controlDashboardSettings,
        register: registerDashboardSettings,
        handleSubmit: handleSubmitDashboardSettings,
        setValue: setValueDashboardSettings,
        getValues: getValuesDashboardSettings,
        watch: watchDashboardSettings,
        reset: resetDashboardSettings,
        clearErrors: clearErrorsDashboardSettings,
        formState: {
            errors: errorsDashboardSettings,
            isSubmitting: isSubmittingDashboardSettings,
            isDirty: isDirtyDashboardSettings,
            isValid: isValidDashboardSettings },
    } = useForm<DashboardSettings>({
        resolver: zodResolver(ChangeDashboardSettings),// Configuration the validation with the zod schema.
        defaultValues: {
            headerTitle: data?.generators[3]?.generatorName ?? "",
            subHeaderTitle: data?.generators[4]?.generatorName ?? ""
        }
    });

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        clearErrors,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<GeneratorSettings>({
        resolver: zodResolver(ChangeGeneratorSettings), // Configuration the validation with the zod schema.
        defaultValues: {
            generatorNames: [
                {
                    id: 1,
                    generatorName: data?.generators[0]?.generatorName ?? ""
                },
                {
                    id: 2,
                    generatorName: data?.generators[1]?.generatorName ?? ""
                },
                {
                    id: 3,
                    generatorName: data?.generators[2]?.generatorName ?? ""
                }] // Initialize with three empty fields
        }

    });


    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "generatorNames", // unique name for your Field Array
    });

    useEffect(() => {
        if (data && isLoaded == false) {
            fields.map((field, index) => (
                setValue(`generatorNames.${index}.generatorName`, data?.generators[index]?.generatorName ?? "")
            ))

            setValueDashboardSettings('headerTitle', data?.generators[3]?.generatorName ?? "")
            setValueDashboardSettings('subHeaderTitle', data?.generators[4]?.generatorName ?? "")

            setIsLoaded(true)
        }
        return
    }, [data])

    async function onSubmit(data: GeneratorSettings) {
        console.log(data);

        mutate({
            ...data
        })
        refetch()
    };


    async function onSubmitDashboardSettings(data: DashboardSettings) {
        console.log(data);

        mutateDashboard({
            ...data
        })
        refetch()
    };

    const isSubmittable = !!isDirty && !!isValid;

    return (
        <>
            <main
                className={`flex min-h-screen w-full flex-col items-start justify-start space-y-8 bg-[#202020] px-24 py-24 font-normal text-primary xl:px-80 `}
            >
                <h1 className="text-3xl font-bold">Settings</h1>
                <div className="flex w-full flex-row items-start border-b-2 border-secondary">
                    <div
                        onClick={() => setSelectedTab(0)}
                        className={`w-fit p-3 text-xl font-bold transition-all duration-200 ${selectedTab === 0
                            ? selectedTabStyle
                            : `cursor-pointer text-white hover:text-[#febfc3]`
                            }`}
                    >
                        General
                    </div>
                    <div
                        onClick={() => setSelectedTab(1)}
                        className={`w-fit p-3 text-xl font-bold transition-all duration-200  ${selectedTab === 1
                            ? selectedTabStyle
                            : `cursor-pointer text-white hover:text-[#febfc3]`
                            }`}
                    >
                        Account
                    </div>
                </div>
                {/* content container */}
                <div className="flex w-full flex-col">
                    {/* GENERAL TAB */}
                    {selectedTab === 0 && (
                        <div className="flex-col space-y-8">
                            <form className="flex h-fit w-full flex-col space-y-8" onSubmit={handleSubmitDashboardSettings(onSubmitDashboardSettings)}>
                                {/* Dashboard Settings */}
                                <div className="text-md flex flex-col space-y-4">
                                    <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                        Dashboard Settings
                                    </h1>
                                    <div className="flex w-full flex-col space-y-7 bg-base-100 p-7">
                                        <div className="flex flex-col space-y-2">
                                            <h2 className=" text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                                Header Title
                                            </h2>
                                            {/* Header Title */}
                                            <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                                <input
                                                    id="HeaderTitle"
                                                    {...registerDashboardSettings('headerTitle')}
                                                    type="text"
                                                    className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                    placeholder="TYPE HERE..."
                                                    defaultValue={data?.generators[3]?.generatorName ?? ""}
                                                />
                                            </label>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                                Sub-header Title
                                            </h2>
                                            {/* Sub-Header Title */}
                                            <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                                <input
                                                    id="SubHeaderTitle"
                                                    {...registerDashboardSettings('subHeaderTitle')}
                                                    type="text"
                                                    className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                    placeholder="TYPE HERE..."
                                                    defaultValue={data?.generators[4]?.generatorName ?? ""}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Buttons */}
                                <div className="flex w-full flex-row gap-5">
                                    {/* CANCEL BTN */}
                                    <button
                                        type="button"
                                        onClick={() => resetDashboardSettings()}
                                        className="h-[3rem] border-[1px] border-[#CCCCCC] px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] duration-200 hover:bg-[#424242] focus:bg-secondary"
                                    >
                                        Discard Changes
                                    </button>

                                    {/* SUBMIT BTN */}
                                    <button
                                        type="submit"
                                        // onClick={props.submitModal}
                                        className="h-[3rem] border-[1px] cursor-pointer border-success bg-success px-[1.5rem] text-center text-xs font-normal uppercase 
                                        tracking-[0.2em] text-white duration-200 
                                        hover:bg-[#5ec772] focus:bg-[#3d8b4b]
                                        disabled:bg-green-700 disabled:border-green-700 disabled:cursor-not-allowed"
                                        disabled={!isDirtyDashboardSettings}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>

                            <form className="flex h-fit w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
                                {/* Generator Settings */}
                                <div className="text-md flex flex-col space-y-4">
                                    <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                        Generator Settings
                                    </h1>

                                    {/* Generator 1 Title */}
                                    <div className="flex w-full flex-col space-y-7 bg-base-100 p-7">
                                        {fields.map((field, index) => (
                                            <div className="flex flex-col space-y-2">
                                                <h2 className=" text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                                    Generator No. {index + 1} Title
                                                </h2>
                                                <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                                    <Controller
                                                        key={field.id}  // important for React keys
                                                        name={`generatorNames.${index}.generatorName`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <input
                                                                id="GeneratorTitle1"
                                                                type="text"
                                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                                {...field}
                                                                defaultValue={data?.generators[index]?.generatorName ?? ""}
                                                                // value={inputData[index]}
                                                                placeholder="TYPE HERE..."
                                                            // onChange={(event) => {
                                                            //     console.log(event.currentTarget.value)
                                                            //     setValue(`generatorNames.${index}.generatorName`, event.currentTarget.value)
                                                            //     inputData[index] = event.currentTarget.value
                                                            // }}
                                                            />
                                                        )}
                                                    />
                                                    {/* <input
                                                    key={field.id} // important to include key with field's id
                                                    {...register(`generatorNames.${index}.generatorName`)}
                                                    id="GeneratorTitle1"
                                                    type="text"
                                                    className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                    placeholder="TYPE HERE..."
                                                    value={getValues(`generatorNames.${index}.generatorName`)}
                                                    onChange={(event) => {
                                                        console.log(event.currentTarget.value)
                                                        setValue(`generatorNames.${index}.generatorName`, event.currentTarget.value)
                                                    }}
                                                // defaultValue={}
                                                /> */}
                                                </label>
                                            </div>

                                        ))}

                                        {/* Generator 2 Title */}
                                        {/* <div className="flex flex-col space-y-2">
                                        <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Generator No. 2 Title
                                        </h2>
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="GeneratorTitle2"
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div> */}

                                        {/* Generator 3 Title */}
                                        {/* <div className="flex flex-col space-y-2">
                                        <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Generator No. 3 Title
                                        </h2>
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="GeneratorTitle3"
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div> */}
                                    </div>
                                </div>

                                {/* Form Buttons */}
                                <div className="flex w-full flex-row gap-5">
                                    {/* CANCEL BTN */}
                                    <button
                                        type="button"
                                        onClick={() => reset()}
                                        className="h-[3rem] border-[1px] border-[#CCCCCC] px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] duration-200 hover:bg-[#424242] focus:bg-secondary"
                                    // disabled={isSubmitting}
                                    >
                                        Discard Changes
                                    </button>

                                    {/* SUBMIT BTN */}
                                    <button
                                        type="submit"
                                        // onClick={props.submitModal}
                                        className="h-[3rem] border-[1px] cursor-pointer border-success bg-success px-[1.5rem] text-center text-xs font-normal uppercase 
                                        tracking-[0.2em] text-white duration-200 
                                        hover:bg-[#5ec772] focus:bg-[#3d8b4b]
                                        disabled:bg-green-700 disabled:border-green-700 disabled:cursor-not-allowed"
                                        disabled={!isSubmittable}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ACCOUNT TAB */}
                    {selectedTab === 1 && (
                        <div
                            className="flex h-fit w-full flex-col space-y-8"
                        // onSubmit={handleSubmit}
                        >
                            {/* Dashboard Settings */}
                            <div className="text-md flex flex-col space-y-4">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Change Password
                                </h1>
                                <div className="flex w-full flex-col">

                                    <NewPassword />
                                </div>
                            </div>


                        </div>
                    )}
                </div>

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
            </main>
        </>
    );
}
