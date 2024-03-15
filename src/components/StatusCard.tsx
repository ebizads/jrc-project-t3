//icons
const successIcon = "fa-solid fa-circle-check text-4xl text-success";
const warningIcon = "fa-solid fa-hourglass-half text-4xl text-warning";
const errorIcon = "fa-solid fa-triangle-exclamation text-4xl text-error";
const infoIcon = "fa-solid fa-circle-info text-4xl text-info";

const StatusCard = ({
    id,
    date,
    time,
    statusType,
    content,
    statusName,
}: any) => {
    return (
        <>
            <div
                key={id}
                className={
                    "flex w-full flex-row items-center justify-between rounded-lg border-l-[8px] bg-secondary px-7 py-5 text-xs tracking-wider " +
                    "border-l-" +
                    statusType
                }
            >
                <div className="flex flex-col space-y-2 font-normal">
                    {/* Time */}
                    <div className="flex flex-row items-center space-x-2 text-xs tracking-widest text-[#8E8E8E]">
                        <i className="fa-regular fa-clock" />
                        <div className="">{time}</div>
                    </div>
                    {/* Content */}
                    <div className="mr-4 text-sm">
                        {content}
                        <span
                            className={"font-semibold " + "text-" + statusType}
                        >
                            {statusName}
                        </span>
                        .
                    </div>
                </div>
                <i className={getStatusType(statusType)} />
            </div>
        </>
    );
};

const getStatusType = (stat: any) => {
    switch (stat) {
        case "success":
            return successIcon;
        case "warning":
            return warningIcon;
        case "error":
            return errorIcon;
        case "info":
            return infoIcon;
        default:
            return infoIcon;
    }
};

export default StatusCard;
