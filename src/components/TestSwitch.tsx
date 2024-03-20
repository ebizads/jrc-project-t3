import type { TestStatus } from "~/utils/types";
import TestStatusGroup from "./TestStatusGroup";

//STATUS COLORS
const yellowGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FFFA8B] bg-gradient-to-b from-[#434336] to-[#7F7B2D] p-3 text-center tracking-widest text-[#FFFA8B] shadow-[0_0_8px_rgba(255,250,139,1)] ";
const greenGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] p-3 text-center tracking-widest text-[#B4FFBC] shadow-[0_0_8px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] p-3 text-center tracking-widest text-[#FFCFD1] shadow-[0_0_8px_rgba(232,84,92,1)] ";
// const optionUnselected =
//     "flex h-full w-full flex-col rounded-full p-3 text-center font-normal tracking-widest text-[#7E7E7E]";

const TestSwitch = (props: { id: string; statusSet: TestStatus[] }) => {
    return (
        <>
            <div key={props?.id} className="space-y-5">
                {props?.statusSet.map((status: TestStatus) => (
                    <TestStatusGroup
                        key={status.key}
                        groupName={status.name}
                        // Define statusList dynamically based on status name
                        testStatusList={getStatusList(status.name)}
                        selectedStatus={status.value}
                    />
                ))}
            </div>
        </>
    );
};

// Function to define statusList dynamically based on status name
const getStatusList = (statusName: string) => {
    // Define statusList based on status name
    switch (statusName) {
        case "EMERGENCY":
            return [
                { key: "status1", option: false, color: redGlow },
                { key: "status2", option: true, color: greenGlow },
            ];
        case "FREEZER_DOOR":
            return [
                { key: "status1", option: false, color: redGlow },
                { key: "status2", option: true, color: greenGlow },
            ];
        case "PHOTO_SENSOR":
            return [
                { key: "status1", option: false, color: redGlow },
                { key: "status2", option: true, color: greenGlow },
            ];
        case "POS":
            return [
                { key: "status1", option: false, color: redGlow },
                { key: "status2", option: true, color: greenGlow },
            ];
        default:
            return [];
    }
};

export default TestSwitch;
