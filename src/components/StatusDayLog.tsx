import StatusCard from "./StatusCard";

const StatusDayLog = ({ id, day, statusLogSet }: any) => {
    return (
        <div
            key={id}
            className="space-y-4 text-sm font-normal tracking-widest text-[#CCCCCC]"
        >
            <h2>{day}</h2>
            {statusLogSet.map((stat: any) => (
                <StatusCard
                    key={stat.key}
                    time={stat.time}
                    statusType={stat.statusType}
                    content={stat.content}
                    statusName={stat.statusName}
                />
            ))}
        </div>
    );
};

export default StatusDayLog;
