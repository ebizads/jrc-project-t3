import type { StatusCardType } from "~/utils/types";

const StatusCard = (statusCard: StatusCardType) => {
    //get the Status Type for the status icons and color
    const [textColorDynamic, borderColorDynamic, iconDynamic] = getStatusType(
        statusCard.statusType
    );

    return (
        <>
            <div
                key={statusCard.id}
                className={
                    "flex w-full flex-row items-center justify-between rounded-lg border-l-[8px] bg-secondary px-7 py-5 text-xs tracking-wider " +
                    borderColorDynamic
                }
            >
                <div className="flex flex-col space-y-2 font-normal">
                    {/* Time */}
                    <div className="flex flex-row items-center space-x-2 text-xs tracking-widest text-[#8E8E8E]">
                        <i className="fa-regular fa-clock" />
                        <div className="">{statusCard.time}</div>
                    </div>
                    {/* Content */}
                    <div className="mr-4 text-sm font-normal">
                        {statusCard.content}
                        <span className={"font-semibold " + textColorDynamic}>
                            {statusCard.statusName}
                        </span>
                        .
                    </div>
                </div>
                <i className={iconDynamic} />
            </div>
        </>
    );
};

function getStatusType(itemType: string): [string, string, string] {
    let textColor: string;
    let borderColor: string;
    let icon: string;

    switch (itemType) {
        case "success":
            textColor = "text-success";
            borderColor = "border-l-success";
            icon = "fa-solid fa-circle-check text-4xl text-success";
            break;
        case "warning":
            textColor = "text-warning";
            borderColor = "border-l-warning";
            icon = "fa-solid fa-hourglass-half text-4xl text-warning";
            break;
        case "error":
            textColor = "text-error";
            borderColor = "border-l-error";
            icon = "fa-solid fa-triangle-exclamation text-4xl text-error";
            break;
        case "info":
            textColor = "text-info";
            borderColor = "border-l-info";
            icon = "fa-solid fa-circle-info text-4xl text-info";
            break;
        default:
            textColor = "text-info";
            borderColor = "border-l-info";
            icon = "fa-solid fa-circle-info text-4xl text-info";
    }

    return [textColor, borderColor, icon];
}

export default StatusCard;
