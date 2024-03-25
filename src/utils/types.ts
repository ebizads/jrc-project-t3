export type Generator = {
    generatorName: string;
};

export type Status = {
    key: string;
    name: string;
    value: string;
};

export type StatusCardType = {
    id: string;
    // date: Date,
    time: string;
    statusType: string;
    content: string;
    statusName: string;
};

export type StatusDayLogType = {
    id: string;
    day: string;
    statusLogSet: StatusCardType[];
};

export type StatusGroupType = {
    groupName: string;
    statusList: statusList[];
    selectedStatus: string;
};

export type statusList = {
    key: string;
    option: string;
    color: string;
};

export type RemoteOperationProps = {
    disabled: boolean;
};

export type StatusDiagramProps = {
    loadStatus: string;
    genStatus: string;
};

//=========================== test types beloww ===========================
export type TestStatus = {
    key: string;
    name: string;
    value: boolean;
};

export type testStatusList = {
    key: string;
    option: boolean;
    color: string;
};

export type TestStatusGroupType = {
    groupName: string;
    testStatusList: testStatusList[];
    selectedStatus: boolean;
};
