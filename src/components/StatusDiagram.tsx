const greenGlow =
    " w-full h-full items-center px-2 py-5 text-center font-semibold uppercase tracking-widest bg-gradient-to-tr from-[#44774A] via-[#2E362E] to-[#44774A] text-[#80D088] ";
const yellowGlow =
    " w-1/3 h-full items-center px-2 py-5 text-center font-semibold uppercase tracking-widest border-2 border-[#FFFA8B] bg-gradient-to-b from-[#434336] to-[#7F7B2D] text-center tracking-widest text-[#FFFA8B] shadow-[0_0_8px_rgba(255,250,139,1)] ";
const redGlow =
    " w-1/3 h-full items-center px-2 py-5 text-center font-semibold uppercase tracking-widest border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] text-center tracking-widest text-[#FFCFD1] shadow-[0_0_10px_rgba(232,84,92,1)] ";

const StatusDiagram = () => {
    return (
        <div className="flex flex-col">
            <div className="flex w-full flex-row pb-5 text-xs tracking-wider">
                <div className={`${yellowGlow} rounded-full text-[11px]`}>
                    Commercial Power
                </div>
                <div className="w-1/3 text-[11px] font-semibold uppercase">
                    space between
                </div>
                <div className="h-full w-1/3 rounded-xl bg-gradient-to-tr from-[#306536] via-[#80D088] to-[#306536] p-[1px]">
                    <div className={`${greenGlow} rounded-xl text-2xl`}>
                        Load
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-row justify-center bg-secondary p-1 py-5 text-xs tracking-wider">
                <div className={`${redGlow} rounded-xl text-[11px]`}>
                    <div className=" text-center text-2xl font-semibold uppercase tracking-widest">
                        Deg
                    </div>
                    <div className=" text-center text-xs font-semibold uppercase">
                        Generating
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDiagram;
