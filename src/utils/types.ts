export type Generator = {
    generatorName: string;
    generatorData: Status[];
    runningHours: number;
};

export type Status = {
    // key: string;
    name: string;
    value: string;
};

export type StatusLogType = {
    id: number;
    status_type: String;
    status_msg: String;
    status: String;
    createdAt: Date;
    deleted: boolean;
    deletedAt: Date;
};

export type StatusCardType = {
    id: string;
    // date: Date,
    time: Date;
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
    remoteOperationStatus: boolean;
    disabled: boolean;
};

export type CloseModalFunction = () => void;
type SubmitModalFunction = () => void;

export type ModalVerificationProps = {
    isModalOpen: boolean;
    modalTitle: string;
    modalStatus: string;
    submitModal: SubmitModalFunction;
    closeModal: CloseModalFunction;
};

export type ModalLoadingProps = {
    isModalOpen: boolean;
    modalTitle: string;
    modalStatus: string;
};

export type StatusDiagramProps = {
    loadStatus: string;
    degStatus: string;
};

//================================== test types below ===================================
//=========================== to be deleted before deployment ===========================
export type TestGenerator = {
    generatorId: number | undefined;
    generatorName: string;
    generatorData: TestStatus[];
    generatorOutputData?: TestStatus[];
    runningHours: number;
};

export type TestStatus = {
    name: string;
    value: boolean;
};

export type TestStatusFloat = {
    name: string;
    value: number;
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
