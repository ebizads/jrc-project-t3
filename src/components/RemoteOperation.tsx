import { useState } from "react";
import { RemoteOperationProps } from "~/utils/types";

const greenGlow =
    " flex h-full w-full flex-col space-y-1 rounded-xl border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] px-3 py-6 text-left tracking-widest text-[#B4FFBC] shadow-[0_0_10px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col space-y-1 rounded-xl border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] px-3 py-6 text-left tracking-widest text-[#FFCFD1] shadow-[0_0_10px_rgba(232,84,92,1)] ";
const optionUnselected =
    "flex h-full w-full flex-col space-y-1 rounded-xl bg-secondary px-3 py-6 text-left font-normal tracking-widest text-[#7E7E7E]";

const RemoteOperation = (props: RemoteOperationProps) => {
    const [selected, setSelected] = useState(0);

    const handleClick = (index: number) => {
        if (!props.disabled) {
            setSelected(index);
        }
    };

    return (
        <div className="flex w-full select-none flex-row items-center justify-center space-x-4 p-1 text-xs tracking-wider">
            {/* Handle Click for STOP button */}
            <div
                onClick={() => handleClick(0)}
                className={
                    !props.disabled
                        ? selected === 0
                            ? redGlow
                            : `${optionUnselected} cursor-pointer transition-all ease-in hover:bg-[#4B4B4B]`
                        : `${optionUnselected} cursor-not-allowed`
                }
            >
                <h2 className="uppercase">Diesel Generator</h2>
                <h2 className="text-3xl font-semibold uppercase">Stop</h2>
            </div>
            {/* Handle Click for START button */}
            <div
                onClick={() => handleClick(1)}
                className={
                    !props.disabled
                        ? selected === 1
                            ? greenGlow
                            : `${optionUnselected} cursor-pointer transition-all ease-in hover:bg-[#4B4B4B]`
                        : `${optionUnselected} cursor-not-allowed`
                }
            >
                <h2 className="uppercase">Diesel Generator</h2>
                <h2 className="text-3xl font-semibold uppercase">Start</h2>
            </div>
        </div>
    );
};

export default RemoteOperation;
