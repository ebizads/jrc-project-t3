import StatusGroup from "./StatusGroup";

//STATUS COLORS

//icons
const successIcon = "fa-solid fa-circle-check text-4xl text-success";
const warningIcon = "fa-solid fa-hourglass-half text-4xl text-warning";
const errorIcon = "fa-solid fa-triangle-exclamation text-4xl text-error";
const infoIcon = "fa-solid fa-circle-info text-4xl text-info";

var today = new Date();

const StatusCard = ({ id, statusType, content, color }: any) => {
    return (
        <>
            <div className="flex w-full select-none flex-row items-center justify-between rounded-lg border-l-[7px] border-l-success bg-secondary p-5 text-xs tracking-wider">
                <div className="flex flex-col space-y-2 font-normal">
                    {/* Time */}
                    <div className="flex flex-row items-center space-x-2 text-xs tracking-widest text-[#8E8E8E]">
                        <i className="fa-regular fa-clock" />
                        <div className="">{"" + today}</div>
                    </div>
                    {/* Content */}
                    <div className="mr-5 text-sm">{content}</div>
                </div>
                <i className={infoIcon} />
            </div>
        </>
    );
};

export default StatusCard;
