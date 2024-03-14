import StatusGroup from "./StatusGroup";

//STATUS COLORS
const greenGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] p-3 text-center tracking-widest text-[#B4FFBC] shadow-[0_0_8px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] p-3 text-center tracking-widest text-[#FFCFD1] shadow-[0_0_8px_rgba(232,84,92,1)] ";

const StatusCard = ({ id, statusType, content, color }: any) => {
    return (
        <>
            <div className="flex w-full select-none flex-row rounded-lg bg-secondary p-1 text-xs tracking-wider">
                <div className="flex flex-col">test</div>
                <div className="">ddd</div>
            </div>
        </>
    );
};

export default StatusCard;
