import { useState } from "react";

const EditHoursButton = (props: { runningHours: number }) => {
    const [openEdit, setOpenEdit] = useState(false);
    // const [inputText, setInputText] = useState("");

    return (
        <>
            <div className="flex w-full flex-col">
                <h2 className=" pb-2 text-xs font-normal uppercase tracking-widest text-[#CCCCCC]">
                    Running Hours
                </h2>

                {/* unopened edit */}
                {!openEdit && (
                    <div className=" flex w-full select-none flex-row gap-2 rounded-full p-1 text-xs uppercase tracking-wider">
                        <div className="flex h-full w-4/6 flex-row justify-between rounded-full bg-secondary px-6 py-3 font-normal tracking-widest text-[#7E7E7E]">
                            <h2 className="text-white">{props.runningHours}</h2>
                            <h2>Hours</h2>
                        </div>
                        <button
                            className="flex h-full w-3/6 flex-row items-center justify-center gap-2 rounded-full border border-[#CCCCCC] p-3 text-center font-normal tracking-widest text-[#CCCCCC] transition-all duration-200 hover:bg-[#424242]"
                            onClick={() => setOpenEdit(true)}
                        >
                            <h2>EDIT TIME</h2>
                            <i className="fa-solid fa-pencil" />
                        </button>
                    </div>
                )}

                {/* opened edit */}
                {openEdit && (
                    <div className=" flex w-full flex-row gap-2 rounded-full p-1 text-xs uppercase tracking-wider">
                        <label className="input input-primary flex h-full w-4/6 flex-row justify-between rounded-full bg-[#4b4b4b] px-6 py-3 text-xs font-normal tracking-widest text-[#b1b1b1]">
                            <input
                                type="number"
                                placeholder="TYPE HERE..."
                                className="w-3/5 text-white placeholder:text-xs placeholder:font-normal placeholder:tracking-widest placeholder:text-[#b1b1b1]"
                            />
                            <h2>Hours</h2>
                        </label>
                        <button
                            className="tooltip tooltip-error h-full w-1/6 items-center justify-center gap-2 rounded-full border border-[#FF9CA2] bg-[#462D2F] p-3 text-center font-normal tracking-widest text-[#F08288] transition-all duration-200 hover:bg-[#6f4d50]"
                            data-tip="DISCARD CHANGES"
                            onClick={() => setOpenEdit(false)}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                        <button
                            className="tooltip tooltip-success h-full w-1/6 items-center justify-center gap-2 rounded-full border border-[#9CFDA6] bg-[#38743e] p-3 text-center font-normal tracking-widest text-[#B4FFBC] transition-all duration-200 hover:bg-[#54a05c]"
                            data-tip="SAVE CHANGES"
                        >
                            <i className="fa-solid fa-check" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditHoursButton;
