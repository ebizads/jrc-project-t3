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
    status_type: string;
    status_msg: string;
    status: string;
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
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any*/
    refetch?: any;
    generatorId: number;
    remoteOperationStatus: boolean;
    disabled: boolean;
    standby: boolean;
};

export type CloseModalFunction = () => void;
type SubmitModalFunction = () => void;

export type ModalVerificationProps = {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any*/
    refetch?: any;
    generatorId: number;
    isModalOpen: boolean;
    modalTitle: string;
    modalStatus: string;
    //link to api route
    // apiStart: boolean;
    submitModal: SubmitModalFunction;
    closeModal: CloseModalFunction;
};

export type ModalDashboardStatusProps = {
    isModalOpen: boolean;
    // modalTitle: string;
    closeModal?: CloseModalFunction
    modalStatus: string;
};

export type ModalForgotPassProps = {
    isModalOpen: boolean;
    closeModal: CloseModalFunction
};


export type StatusDiagramProps = {
    commercialPower: string;
    loadStatus: string;
    degStatus: string;
};

export type EmailData = {
    sendTo: string[],
    cc?: string,
    resetToken: string,
}

//================================== test types below ===================================
//=========================== to be deleted before deployment ===========================
export type TestGenerator = {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any*/
    refetch: any;
    generatorId: number;
    generatorName: string;
    generatorData: Array<TestStatus>;
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
