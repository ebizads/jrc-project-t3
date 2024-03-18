import StatusCard from "./StatusCard";
import type { StatusDayLogType } from "~/utils/types";

const StatusDayLog = (statusDayLog: StatusDayLogType) => {
    return (
        <div
            key={statusDayLog.id}
            className="space-y-4 text-sm font-normal tracking-widest text-[#CCCCCC]"
        >
            <h2>{statusDayLog.day}</h2>
            {statusDayLog.statusLogSet.map((stat, idx) => (
                <StatusCard
                    key={idx}
                    id={stat.id}
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
