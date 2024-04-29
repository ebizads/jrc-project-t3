import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import NewPassword from "~/components/NewPassword";
import { ChangeGeneratorSettings } from "~/server/schemas/generator";
import { api } from "~/utils/api";

type GeneratorSettings = z.infer<typeof ChangeGeneratorSettings>;

const selectedTabStyle =
    "border-b-[3px] border-[#DC000C] text-[#DC000C] cursor-default";

export default function Settings() {
    const ref = useRef(null);
    const { mutate } = api.generator.changeGeneratorData.useMutation({})

    const { data, refetch } = api.generator.findAllGenerators.useQuery({})

    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [inputData, setInputData] = useState<Array<string | undefined>>([
        data?.generators[0]?.generatorName ?? "",
        data?.generators[1]?.generatorName ?? "",
        data?.generators[2]?.generatorName ?? ""
    ])

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        clearErrors,
        formState: { errors, isSubmitting, isDirty },
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
            setIsLoaded(true)
        }
    }, [data])

    async function onSubmit(data: GeneratorSettings) {
        console.log(data);

        mutate({
            ...data
        })
        reset()
        refetch()
    };


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
                        <form className="flex h-fit w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
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
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

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
                                                Generator No. {index} Title
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
                                                            value={inputData[index]}
                                                            onChange={(event) => {
                                                                console.log(event.currentTarget.value)
                                                                setValue(`generatorNames.${index}.generatorName`, event.currentTarget.value)
                                                                inputData[index] = event.currentTarget.value
                                                            }}
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
                                    // onClick={props.closeModal}
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
                                    // disabled={isDirty}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
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
            </main>
        </>
    );
}
