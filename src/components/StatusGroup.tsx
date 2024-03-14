const optionUnselected =
    "flex h-full w-full flex-col rounded-full p-3 text-center font-normal tracking-widest text-[#7E7E7E]";

const StatusGroup = ({ id, groupName, statusList, selectedStatus }: any) => {
    return (
        <div key={id} className="flex w-full flex-col">
            <h2 className=" pb-2 text-xs font-normal uppercase tracking-widest text-[#CCCCCC]">
                {groupName}
            </h2>
            <div className=" flex w-full select-none flex-row rounded-full bg-secondary p-1 text-xs tracking-wider">
                {statusList.map((s: any) => (
                    <div
                        key={s.key}
                        className={
                            s.option === selectedStatus
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
