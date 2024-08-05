import { StatusGroupType } from "~/utils/types";

const optionUnselected =
    "flex h-full w-full flex-col rounded-full p-3 text-center font-normal tracking-widest text-[#7E7E7E]";

const StatusGroup = (statusGroup: StatusGroupType) => {
    return (
        <div className="flex w-full flex-col">
            <h2 className=" pb-2 text-xs font-normal uppercase tracking-widest text-[#CCCCCC]">
                {statusGroup.groupName}
            </h2>
            <div className="relative flex w-full select-none flex-row rounded-full bg-secondary p-1 text-xs tracking-wider">
                {statusGroup.statusList.map((s) => (
                    <div key={s.key} className={`h-full w-full relative ${s.option == 'GENERATING' && s.option === statusGroup.selectedStatus ? `animate-[pulse_0.8s_cubic-bezier(0,0,0,0)_infinite]` : ``}`}>
                        <div
                            className={
                                s.option === statusGroup.selectedStatus
                                    ? s.color + ` relative z-10`
                                    : optionUnselected
                            }
                        >
                            <span className={s.option == 'GENERATING' && s.option === statusGroup.selectedStatus ? `animate-[pulse_0.7s_cubic-bezier(0,0,0,1)_infinite]` : ``}>
                                {s.option}
                            </span>
                        </div>
                        {/* {s.option == 'GENERATING' && s.option === statusGroup.selectedStatus
                            ? <div className={`absolute left-[35%] top-0 opacity-70 h-full w-10 -z-1 ${s.color} ${s.animate ? ` animate-ping` : ` `} `}></div>
                            : <></>} */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusGroup;
