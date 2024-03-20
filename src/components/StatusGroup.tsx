import { StatusGroupType } from "~/utils/types";

const optionUnselected =
    "flex h-full w-full flex-col rounded-full p-3 text-center font-normal tracking-widest text-[#7E7E7E]";

const StatusGroup = (statusGroup: StatusGroupType) => {
    return (
        <div className="flex w-full flex-col">
            <h2 className=" pb-2 text-xs font-normal uppercase tracking-widest text-[#CCCCCC]">
                {statusGroup.groupName}
            </h2>
            <div className=" flex w-full select-none flex-row rounded-full bg-secondary p-1 text-xs tracking-wider">
                {statusGroup.statusList.map((s) => (
                    <div
                        key={s.key}
                        className={
                            s.option === statusGroup.selectedStatus
                                ? s.color
                                : optionUnselected
                        }
                    >
                        {s.option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusGroup;
