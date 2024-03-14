import StatusGroup from "./StatusGroup";

//STATUS COLORS
const yellowGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FFFA8B] bg-gradient-to-b from-[#434336] to-[#7F7B2D] p-3 text-center tracking-widest text-[#FFFA8B] shadow-[0_0_8px_rgba(255,250,139,1)] ";
const greenGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] p-3 text-center tracking-widest text-[#B4FFBC] shadow-[0_0_8px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] p-3 text-center tracking-widest text-[#FFCFD1] shadow-[0_0_8px_rgba(232,84,92,1)] ";
const optionUnselected =
    "flex h-full w-full flex-col rounded-full p-3 text-center font-normal tracking-widest text-[#7E7E7E]";

const GeneratorControlStatus = ({ id, statusSet }: any) => {
    return (
        <>
            <div key={id} className="space-y-5">
                {statusSet.map((status: any) => (
                    <StatusGroup
                        key={status.key}
                        groupName={status.name}
                        // Define statusList dynamically based on status name
                        statusList={getStatusList(status.name)}
                        selectedStatus={status.value}
                    />
                ))}
            </div>
        </>
    );
};

// Function to define statusList dynamically based on status name
const getStatusList = (statusName: any) => {
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
