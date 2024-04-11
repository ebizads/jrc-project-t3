import type { Status } from "~/utils/types";
import StatusGroup from "./StatusGroup";

//STATUS COLORS
const yellowGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FFFA8B] bg-gradient-to-b from-[#434336] to-[#7F7B2D] p-3 text-center tracking-widest text-[#FFFA8B] shadow-[0_0_8px_rgba(255,250,139,1)] ";
const greenGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] p-3 text-center tracking-widest text-[#B4FFBC] shadow-[0_0_8px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] p-3 text-center tracking-widest text-[#FFCFD1] shadow-[0_0_8px_rgba(232,84,92,1)] ";
// const optionUnselected =
//     "flex h-full w-full flex-col rounded-full p-3 text-center font-normal tracking-widest text-[#7E7E7E]";

const GeneratorControlStatus = (props: { id: string; statusSet: Status[] }) => {
    return (
        <>
            <div key={props?.id} className="space-y-5">
                {props?.statusSet.map((status: Status) => (
                    <StatusGroup
                        key={status.key}
                        groupName={status.name}
                        // Define statusList dynamically based on status name
                        statusList={getStatusList(status.name)}
                        selectedStatus={status.value}
                    />
                ))}

                <div className="flex w-full flex-col">
                    <h2 className=" pb-2 text-xs font-normal uppercase tracking-widest text-[#CCCCCC]">
                        Running Hours
                    </h2>
                    <div className=" flex w-full select-none flex-row gap-2 rounded-full p-1 text-xs uppercase tracking-wider">
                        <div className="flex h-full w-4/6 flex-row justify-between rounded-full bg-secondary px-6 py-3 font-normal tracking-widest text-[#7E7E7E]">
                            <h2 className="text-white">07.57</h2>
                            <h2>Hours</h2>
                        </div>
                        <button className="flex h-full w-3/6 flex-row items-center justify-center gap-2 rounded-full border border-[#CCCCCC] p-3 text-center font-normal tracking-widest text-[#CCCCCC] transition-all duration-200 hover:bg-[#424242]">
                            <h2>EDIT TIME</h2>
                            <i className="fa-solid fa-pencil" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Function to define statusList dynamically based on status name
const getStatusList = (statusName: string) => {
    // Define statusList based on status name
    switch (statusName) {
        case "COMMERCIAL POWER":
            return [
                { key: "status1", option: "OFF", color: redGlow },
                { key: "status2", option: "ON", color: greenGlow },
            ];
        case "DEG MODE":
            return [
                { key: "status1", option: "GENERATING", color: greenGlow },
                { key: "status2", option: "MANUAL", color: yellowGlow },
                { key: "status3", option: "AUTO", color: greenGlow },
            ];
        case "DEG STATUS":
            return [
                { key: "status1", option: "FAILED", color: redGlow },
                { key: "status2", option: "STANDBY", color: yellowGlow },
                { key: "status3", option: "GENERATING", color: greenGlow },
            ];
        case "REMOTE OPERATION":
            return [
                { key: "status1", option: "STANDBY", color: yellowGlow },
                { key: "status2", option: "ON", color: greenGlow },
            ];
        case "LOAD ON":
            return [
                {
                    key: "status1",
                    option: "COMMERCIAL POWER",
                    color: greenGlow,
                },
                { key: "status2", option: "GENERATOR", color: greenGlow },
            ];
        case "FUEL LEVEL":
            return [
                {
                    key: "status1",
                    option: "LOW",
                    color: redGlow,
                },
                { key: "status2", option: "HIGH", color: greenGlow },
            ];
        default:
            return [];
    }
};

export default GeneratorControlStatus;
