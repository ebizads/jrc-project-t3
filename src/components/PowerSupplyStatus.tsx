import StatusGroup from "./StatusGroup";

//STATUS COLORS
const greenGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#9CFDA6] bg-gradient-to-b from-[#3A463B] to-[#468C4D] p-3 text-center tracking-widest text-[#B4FFBC] shadow-[0_0_8px_rgba(70,140,77,1)] ";
const redGlow =
    " flex h-full w-full flex-col rounded-full border-2 border-[#FF9CA2] bg-gradient-to-b from-[#583D3E] to-[#E8545C] p-3 text-center tracking-widest text-[#FFCFD1] shadow-[0_0_8px_rgba(232,84,92,1)] ";

const PowerSupplyStatus = ({ id, statusSet }: any) => {
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
        case "DC POWER SUPPLY STATUS":
            return [
                { key: "status1", option: "ALARM", color: redGlow },
                { key: "status2", option: "OPERATING", color: greenGlow },
            ];
        case "COMMERCIAL POWER":
            return [
                { key: "status1", option: "OFF", color: redGlow },
                { key: "status2", option: "ON", color: greenGlow },
            ];
        case "BATTERY TEMPERATURE":
            return [
                { key: "status1", option: "HIGH", color: redGlow },
                { key: "status2", option: "GOOD", color: greenGlow },
            ];
        default:
            return [];
    }
};

export default PowerSupplyStatus;
