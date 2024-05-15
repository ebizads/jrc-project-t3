import { TestGenerator, TestStatus } from "~/utils/types";
import {
    BatteryTemp,
    CommercialPower,
    DegMode,
    DegStatus,
    FuelLevel,
    LoadOn,
    PowerSupply,
    RemoteOperation,
    RemoteOperationStatus,
} from "./enums";

export const generateCertificate = () => {
    let result = "";
    const characters =
        // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:'\",.<>/?\\|"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const charactersLength = characters.length;
    for (let i = 0; i < 30; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

export const addHoursToDate = (date: Date, hours: number) => {
    const dateCopy = new Date(date.getTime());
    const hoursToAdd = hours * 60 * 60 * 1000;
    dateCopy.setTime(date.getTime() + hoursToAdd);
    console.log(dateCopy);

    return dateCopy;
};

export const getDataValueEquivalent = (statusName: string, value: boolean) => {
    switch (statusName) {
        case "COMMERCIAL POWER":
            switch (value) {
                case true:
                    return "ON";
                case false:
                    return "OFF";
            }
        case "DEG MODE":
            switch (value) {
                case true:
                    return "GENERATING";
                case false:
                    return "MANUAL";
            }
        // return [
        // ];
        case "DEG STATUS":
            switch (value) {
                case true:
                    return "GENERATING";
                case false:
                    return "FAILED";
            }
        // return [
        //     { key: "status1", option: "FAILED" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "GENERATING" },
        // ];
        case "REMOTE OPERATION":
            switch (value) {
                case true:
                    return "ON";
                case false:
                    return "N/A";
            }
        // return [
        //     { key: "status1", option: "ON" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "N/A" },
        // ];
        case "LOAD ON":
            switch (value) {
                case true:
                    return "COMMERCIAL POWER";
                case false:
                    return "GENERATOR";
            }
        // return [
        //     {
        //         key: "status1",
        //         option: "COMMERCIAL POWER",
        //     },
        //     { key: "status2", option: "GENERATOR" },
        // ];
        case "FUEL LEVEL":
            switch (value) {
                case true:
                    return "COMMERCIAL POWER";
                case false:
                    return "GENERATOR";
            }
        // return [
        //     {
        //         key: "status1",
        //         option: "LOW",
        //     },
        //     { key: "status2", option: "HIGH" },
        // ];
        case "DC POWER SUPPLY STATUS":
            switch (value) {
                case true:
                    return "OPERATING";
                case false:
                    return "ALARM";
            }
        // return [
        //     { key: "status1", option: "ALARM", color: redGlow },
        //     { key: "status2", option: "OPERATING", color: greenGlow },
        // ];
        case "COMMERCIAL POWER":
            switch (value) {
                case true:
                    return "ON";
                case false:
                    return "OFF";
            }
        // return [
        //     { key: "status1", option: "OFF", color: redGlow },
        //     { key: "status2", option: "ON", color: greenGlow },
        // ];
        case "BATTERY TEMPERATURE":
            switch (value) {
                case true:
                    return "HIGHT";
                case false:
                    return "GOOD";
            }
        // return [
        //     { key: "status1", option: "HIGH", color: redGlow },
        //     { key: "status2", option: "GOOD", color: greenGlow },
        // ];
        default:
            return "";
    }
};
//     { key: "status1", option: "GENERATING" },
//     { key: "status2", option: "MANUAL" },
//     { key: "status3", option: "AUTO" },

export const getDataValueEquivalentTest = (
    statusName: string,
    value: boolean
) => {
    switch (statusName) {
        case "COMMERCIAL POWER":
            switch (value) {
                case true:
                    return "ON";
                case false:
                    return "OFF";
            }
        case "DEG MODE":
            switch (value) {
                case true:
                    return "GENERATING";
                case false:
                    return "MANUAL";
            }
        // return [
        //     { key: "status1", option: "GENERATING" },
        //     { key: "status2", option: "MANUAL" },
        //     { key: "status3", option: "AUTO" },
        // ];
        case "DEG STATUS":
            switch (value) {
                case true:
                    return "GENERATING";
                case false:
                    return "FAILED";
            }
        // return [
        //     { key: "status1", option: "FAILED" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "GENERATING" },
        // ];
        case "UNDER_REMOTE_OPERATION":
            switch (value) {
                case true:
                    return "ON";
                case false:
                    return "N/A";
            }
        // return [
        //     { key: "status1", option: "ON" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "N/A" },
        // ];
        case "LOAD ON":
            switch (value) {
                case true:
                    return "COMMERCIAL POWER";
                case false:
                    return "GENERATOR";
            }
        // return [
        //     {
        //         key: "status1",
        //         option: "COMMERCIAL POWER",
        //     },
        //     { key: "status2", option: "GENERATOR" },
        // ];
        case "LOW_FUEL_LEVEL":
            switch (value) {
                case true:
                    return "COMMERCIAL POWER";
                case false:
                    return "GENERATOR";
            }
        // return [
        //     {
        //         key: "status1",
        //         option: "LOW",
        //     },
        //     { key: "status2", option: "HIGH" },
        // ];
        case "DC POWER SUPPLY STATUS":
            switch (value) {
                case true:
                    return "OPERATING";
                case false:
                    return "ALARM";
            }
        // return [
        //     { key: "status1", option: "ALARM", color: redGlow },
        //     { key: "status2", option: "OPERATING", color: greenGlow },
        // ];
        case "COMMERCIAL POWER":
            switch (value) {
                case true:
                    return "ON";
                case false:
                    return "OFF";
            }
        // return [
        //     { key: "status1", option: "OFF", color: redGlow },
        //     { key: "status2", option: "ON", color: greenGlow },
        // ];
        case "BATTERY_HIGH_TEMPERATURE":
            switch (value) {
                case true:
                    return "HIGHT";
                case false:
                    return "GOOD";
            }
        // return [
        //     { key: "status1", option: "HIGH", color: redGlow },
        //     { key: "status2", option: "GOOD", color: greenGlow },
        // ];
        default:
            return "";
    }
};

// export const getMappedStatus = (
//     generatorProps: TestGenerator
// ): [string, string, string, string, string, string, string, string, string] => {
//     const sensorParameters = generatorProps.generatorData;

//     // Generator Status
//     let commercialPower = "";
//     let degMode = "";
//     let degStatus = "";
//     let remoteOperation = "";
//     let loadOn = "";
//     let fuelLevel = "";

//     // DC 48V Power Supply Status
//     let powerSupply = "";
//     let commercialPowerDC = "";
//     let batteryTemp = "";

//     // DASHBOARD STATUS MAPPINGS
//     sensorParameters.forEach((parameter) => {
//         // console.log(parameter.name);
//         switch (parameter.name) {
//             case "AC_POWER_FAILURE":
//                 switch (parameter.value) {
//                     case true:
//                         degStatus = DegStatus.FAILED;
//                         degMode = DegMode.MANUAL; //TO CONFIRM IF DEG MODE SHOULD BE MANUAL
//                         loadOn = LoadOn.COMMERCIALPOWER;
//                         break;
//                     case false:
//                         degStatus = DegStatus.GENERATING;
//                         degMode = DegMode.GENERATING;
//                         loadOn = LoadOn.GENERATOR;
//                         break;
//                 }
//                 break;
//             case "AC_POWER_FAILURE_P":
//                 switch (parameter.value) {
//                     case true:
//                         commercialPower = CommercialPower.OFF;
//                         degStatus = DegStatus.GENERATING;
//                         degMode = DegMode.GENERATING;
//                         loadOn = LoadOn.GENERATOR;
//                     case false:
//                         commercialPower = CommercialPower.ON;
//                         degStatus = DegStatus.STANDBY;
//                         degMode = DegMode.AUTO;
//                         loadOn = LoadOn.COMMERCIALPOWER;
//                 }
//                 break;
//             case "AC_POWER_RECEIVING":
//                 switch (parameter.value) {
//                     case true:
//                         commercialPower = CommercialPower.ON;
//                         commercialPowerDC = CommercialPower.ON;
//                         degStatus = DegStatus.STANDBY;
//                         degMode = DegMode.AUTO;
//                         loadOn = LoadOn.COMMERCIALPOWER;
//                         powerSupply = PowerSupply.OPERATING;
//                         break;
//                     case false:
//                         commercialPower = CommercialPower.OFF;
//                         commercialPowerDC = CommercialPower.OFF;
//                         // powerSupply = PowerSupply.ALARM;
//                         degStatus = DegStatus.GENERATING;
//                         degMode = DegMode.GENERATING;
//                         loadOn = LoadOn.GENERATOR;
//                         break;
//                 }
//                 break;
//             case "BATTERY_HIGH_TEMPERATURE":
//                 switch (parameter.value) {
//                     case true:
//                         batteryTemp = BatteryTemp.HIGH;
//                         break;
//                     case false:
//                         batteryTemp = BatteryTemp.GOOD;
//                         break;
//                 }
//                 break;
//             case "LOW_FUEL_LEVEL":
//                 switch (parameter.value) {
//                     case true:
//                         fuelLevel = FuelLevel.LOW;
//                         break;
//                     case false:
//                         fuelLevel = FuelLevel.HIGH;
//                         break;
//                 }
//                 break;
//             case "MANUAL_LOCAL":
//                 switch (parameter.value) {
//                     case true:
//                         degMode = DegMode.MANUAL;
//                         degStatus = DegStatus.STANDBY;
//                         remoteOperation = RemoteOperation.STANDBY;
//                         powerSupply = PowerSupply.OPERATING;
//                         break;
//                     case false:
//                         degMode = DegMode.AUTO;
//                         break;
//                 }
//                 break;
//             case "OPERATION":
//                 switch (parameter.value) {
//                     case true:
//                         remoteOperation = RemoteOperation.ON;
//                         degStatus = DegStatus.STANDBY;
//                         degMode = DegMode.MANUAL;
//                         powerSupply = PowerSupply.OPERATING;
//                         break;
//                     case false:
//                         remoteOperation = RemoteOperation.STANDBY;
//                         break;
//                 }
//                 break;
//             case "RECTIFIER_ABNORMAL_ALARM":
//                 switch (parameter.value) {
//                     case true:
//                         powerSupply = PowerSupply.ALARM;
//                         degStatus = DegStatus.FAILED;
//                         remoteOperation = RemoteOperation.NA;
//                         break;
//                     case false:
//                         powerSupply = PowerSupply.OPERATING;
//                         degStatus = DegStatus.GENERATING;
//                         // degStatus = DegStatus.GENERATING;
//                         // degStatus = DegStatus.STANDBY;
//                         remoteOperation = RemoteOperation.ON;
//                         break;
//                     // degStatus = DegStatus.STANDBY;
//                 }
//                 break;
//             case "UNDER_REMOTE_OPERATION":
//                 switch (parameter.value) {
//                     case true:
//                         remoteOperation = RemoteOperation.ON;
//                         // remoteOperation = RemoteOperation.STANDBY;
//                         degStatus = DegStatus.GENERATING; //TO CLARIFY
//                         break;
//                     // remoteOperation = RemoteOperation.STANDBY;
//                     case false:
//                         remoteOperation = RemoteOperation.NA;
//                         break;
//                 }
//                 break;
//         }
//     });

//     return [
//         commercialPower,
//         degMode,
//         degStatus,
//         remoteOperation,
//         loadOn,
//         fuelLevel,
//         powerSupply,
//         commercialPowerDC,
//         batteryTemp,
//     ];
// };

export const getTestMappedStatus = (
    generatorProps: TestGenerator
): [string, string, string, string, string, string, string, string, string] => {
    const sensorParameters: TestStatus[] = generatorProps.generatorData;

    // Generator Status
    let commercialPower = "";
    let degMode = "";
    let degStatus = "";
    let remoteOperation = "";
    let loadOn = "";
    let fuelLevel = "";

    // DC 48V Power Supply Status
    let powerSupply = "";
    let commercialPowerDC = "";
    let batteryTemp = "";

    // Dependent cases (FLAGS)
    let degStatusStandby = true;

    // DASHBOARD STATUS MAPPINGS
    if (sensorParameters && sensorParameters.length > 0) {
        sensorParameters.forEach((parameter: TestStatus) => {
            switch (parameter.name) {
                case "Failure_FFWC":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degStatus = DegStatus.FAILED;
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Generating_FFWC":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degStatus = DegStatus.GENERATING;
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Generator_Side_FFWC":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
                case "AC_Input_FFWC":
                    switch (parameter.value) {
                        case true:
                            commercialPowerDC = CommercialPower.ON;
                            break;
                        case false:
                            commercialPowerDC = CommercialPower.ON;
                            break;
                    }
                    break;
                case "Alarm_FFWC":
                    switch (parameter.value) {
                        case true:
                            powerSupply = PowerSupply.ALARM;
                            break;
                        case false:
                            powerSupply = PowerSupply.OPERATING;
                            break;
                    }
                    break;
                case "Battery_Temperature_FFWC":
                    switch (parameter.value) {
                        case true:
                            batteryTemp = BatteryTemp.HIGH;
                            break;
                        case false:
                            batteryTemp = BatteryTemp.GOOD;
                            break;
                    }
                    break;
                case "Low_Fuel_FFWC":
                    switch (parameter.value) {
                        case true:
                            fuelLevel = FuelLevel.LOW;
                            break;
                        case false:
                            fuelLevel = FuelLevel.HIGH;
                            break;
                    }
                    break;
                case "Main_Failure_FFWC":
                    switch (parameter.value) {
                        case true:
                            commercialPower = CommercialPower.OFF;
                            break;
                        case false:
                            commercialPower = CommercialPower.ON;
                            break;
                    }
                    break;
                case "Main_Side_FFWC":
                    switch (parameter.value) {
                        case true:
                            loadOn = LoadOn.COMMERCIALPOWER;
                            break;
                        case false:
                            loadOn = LoadOn.GENERATOR;
                            break;
                    }
                    break;
                case "Manual_Mode_FFWC":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degMode = DegMode.MANUAL;
                            remoteOperation = RemoteOperation.NA;
                            break;
                        case false:
                            degMode = DegMode.AUTO;
                            remoteOperation = RemoteOperation.ON;
                            break;
                    }
                    break;
                case "Operating_FFWC":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Remote_FFWC":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
            }
        });
    }

    // IF MANUAL OFF, GENERATING OFF, and FAILURE OFF
    if (degStatusStandby) {
        degStatus = DegStatus.STANDBY;
    }

    return [
        commercialPower,
        degMode,
        degStatus,
        remoteOperation,
        loadOn,
        fuelLevel,
        powerSupply,
        commercialPowerDC,
        batteryTemp,
    ];
};

export const getTestMappedStatusXR1 = (
    generatorProps: TestGenerator
): [string, string, string, string, string, string, string, string, string] => {
    const sensorParameters = generatorProps.generatorData ?? [];

    // Generator Status
    let commercialPower = "";
    let degMode = "";
    let degStatus = "";
    let remoteOperation = "";
    let loadOn = "";
    let fuelLevel = "";

    // DC 48V Power Supply Status
    let powerSupply = "";
    let commercialPowerDC = "";
    let batteryTemp = "";

    // Dependent cases (FLAGS)
    let degStatusStandby = true;

    // DASHBOARD STATUS MAPPINGS
    if (sensorParameters && sensorParameters.length > 0) {
        sensorParameters.forEach((parameter: TestStatus) => {
            switch (parameter.name) {
                case "Failure_XR1":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degStatus = DegStatus.FAILED;
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Generating_XR1":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degStatus = DegStatus.GENERATING;
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Generator_Side_XR1":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
                case "AC_Input_XR1":
                    switch (parameter.value) {
                        case true:
                            commercialPowerDC = CommercialPower.ON;
                            break;
                        case false:
                            commercialPowerDC = CommercialPower.ON;
                            break;
                    }
                    break;
                case "Alarm_XR1":
                    switch (parameter.value) {
                        case true:
                            powerSupply = PowerSupply.ALARM;
                            break;
                        case false:
                            powerSupply = PowerSupply.OPERATING;
                            break;
                    }
                    break;
                case "Battery_Temperature_XR1":
                    switch (parameter.value) {
                        case true:
                            batteryTemp = BatteryTemp.HIGH;
                            break;
                        case false:
                            batteryTemp = BatteryTemp.GOOD;
                            break;
                    }
                    break;
                case "Low_Fuel_XR1":
                    switch (parameter.value) {
                        case true:
                            fuelLevel = FuelLevel.LOW;
                            break;
                        case false:
                            fuelLevel = FuelLevel.HIGH;
                            break;
                    }
                    break;
                case "Main_Failure_XR1":
                    switch (parameter.value) {
                        case true:
                            commercialPower = CommercialPower.OFF;
                            break;
                        case false:
                            commercialPower = CommercialPower.ON;
                            break;
                    }
                    break;
                case "Main_Side_XR1":
                    switch (parameter.value) {
                        case true:
                            loadOn = LoadOn.COMMERCIALPOWER;
                            break;
                        case false:
                            loadOn = LoadOn.GENERATOR;
                            break;
                    }
                    break;
                case "Manual_Mode_XR1":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degMode = DegMode.MANUAL;
                            remoteOperation = RemoteOperation.NA;
                            break;
                        case false:
                            degMode = DegMode.AUTO;
                            remoteOperation = RemoteOperation.ON;
                            break;
                    }
                    break;
                case "Operating_XR1":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Remote_XR1":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
            }
        });
    }

    // IF MANUAL OFF, GENERATING OFF, and FAILURE OFF
    if (degStatusStandby) {
        degStatus = DegStatus.STANDBY;
    }

    return [
        commercialPower,
        degMode,
        degStatus,
        remoteOperation,
        loadOn,
        fuelLevel,
        powerSupply,
        commercialPowerDC,
        batteryTemp,
    ];
};

export const getTestMappedStatusXR2 = (
    generatorProps: TestGenerator
): [string, string, string, string, string, string, string, string, string] => {
    const sensorParameters = generatorProps.generatorData ?? [];

    // Generator Status
    let commercialPower = "";
    let degMode = "";
    let degStatus = "";
    let remoteOperation = "";
    let loadOn = "";
    let fuelLevel = "";

    // DC 48V Power Supply Status
    let powerSupply = "";
    let commercialPowerDC = "";
    let batteryTemp = "";

    // Dependent cases (FLAGS)
    let degStatusStandby = true;

    // DASHBOARD STATUS MAPPINGS
    if (sensorParameters && sensorParameters.length > 0) {
        sensorParameters.forEach((parameter: TestStatus) => {
            switch (parameter.name) {
                case "Failure_XR2":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degStatus = DegStatus.FAILED;
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Generating_XR2":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degStatus = DegStatus.GENERATING;
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Generator_Side_XR2":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
                case "AC_Input_XR2":
                    switch (parameter.value) {
                        case true:
                            commercialPowerDC = CommercialPower.ON;
                            break;
                        case false:
                            commercialPowerDC = CommercialPower.ON;
                            break;
                    }
                    break;
                case "Alarm_XR2":
                    switch (parameter.value) {
                        case true:
                            powerSupply = PowerSupply.ALARM;
                            break;
                        case false:
                            powerSupply = PowerSupply.OPERATING;
                            break;
                    }
                    break;
                case "Battery_Temperature_XR2":
                    switch (parameter.value) {
                        case true:
                            batteryTemp = BatteryTemp.HIGH;
                            break;
                        case false:
                            batteryTemp = BatteryTemp.GOOD;
                            break;
                    }
                    break;
                case "Low_Fuel_XR2":
                    switch (parameter.value) {
                        case true:
                            fuelLevel = FuelLevel.LOW;
                            break;
                        case false:
                            fuelLevel = FuelLevel.HIGH;
                            break;
                    }
                    break;
                case "Main_Failure_XR2":
                    switch (parameter.value) {
                        case true:
                            commercialPower = CommercialPower.OFF;
                            break;
                        case false:
                            commercialPower = CommercialPower.ON;
                            break;
                    }
                    break;
                case "Main_Side_XR2":
                    switch (parameter.value) {
                        case true:
                            loadOn = LoadOn.COMMERCIALPOWER;
                            break;
                        case false:
                            loadOn = LoadOn.GENERATOR;
                            break;
                    }
                    break;
                case "Manual_Mode_XR2":
                    switch (parameter.value) {
                        case true:
                            degStatusStandby = false;
                            degMode = DegMode.MANUAL;
                            remoteOperation = RemoteOperation.NA;
                            break;
                        case false:
                            degMode = DegMode.AUTO;
                            remoteOperation = RemoteOperation.ON;
                            break;
                    }
                    break;
                case "Operating_XR2":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
                case "Remote_XR2":
                    switch (parameter.value) {
                        case true:
                            break;
                        case false:
                            break;
                    }
                    break;
            }
        });
    }

    // IF MANUAL OFF, GENERATING OFF, and FAILURE OFF
    if (degStatusStandby) {
        degStatus = DegStatus.STANDBY;
    }

    return [
        commercialPower,
        degMode,
        degStatus,
        remoteOperation,
        loadOn,
        fuelLevel,
        powerSupply,
        commercialPowerDC,
        batteryTemp,
    ];
};

export const getMappedStatusDigitalOutputs = (
    generatorProps: TestGenerator
): [boolean | undefined] => {
    // Generator Status
    let remoteOperationStatus;
    const sensorParameters = generatorProps.generatorOutputData ?? [];
    // DC 48V Power Supply Status

    if (
        generatorProps.generatorOutputData &&
        generatorProps.generatorOutputData.length > 0
    )
        generatorProps.generatorOutputData?.forEach((parameter) => {
            switch (parameter.name) {
                case "DIESEL_GENERATOR_START":
                    switch (parameter.value) {
                        case true:
                            // remoteOperationStatus = RemoteOperationStatus.START;
                            remoteOperationStatus = true;
                            break;
                        // remoteOperation = RemoteOperation.STANDBY;
                        case false:
                            // remoteOperationStatus = RemoteOperationStatus.STOP;
                            remoteOperationStatus = false;
                            break;
                    }
                    break;
            }
        });

    return [remoteOperationStatus];
};

export const getMappedStatusDigitalOutputsXR1 = (
    generatorProps: TestGenerator
): [boolean | undefined] => {
    // Generator Status
    let remoteOperationStatus;
    const sensorParameters = generatorProps.generatorOutputData ?? [];
    // DC 48V Power Supply Status

    if (
        generatorProps.generatorOutputData &&
        generatorProps.generatorOutputData.length > 0
    )
        generatorProps.generatorOutputData?.forEach((parameter) => {
            switch (parameter.name) {
                case "DIESEL_GENERATOR_START_XR1":
                    switch (parameter.value) {
                        case true:
                            // remoteOperationStatus = RemoteOperationStatus.START;
                            remoteOperationStatus = true;
                            break;
                        // remoteOperation = RemoteOperation.STANDBY;
                        case false:
                            // remoteOperationStatus = RemoteOperationStatus.STOP;
                            remoteOperationStatus = false;
                            break;
                    }
                    break;
            }
        });

    return [remoteOperationStatus];
};

export const getMappedStatusDigitalOutputsXR2 = (
    generatorProps: TestGenerator
): [boolean | undefined] => {
    // Generator Status
    let remoteOperationStatus;
    const sensorParameters = generatorProps.generatorOutputData ?? [];
    // DC 48V Power Supply Status

    if (
        generatorProps.generatorOutputData &&
        generatorProps.generatorOutputData.length > 0
    )
        generatorProps.generatorOutputData?.forEach((parameter) => {
            switch (parameter.name) {
                case "DIESEL_GENERATOR_START_XR2":
                    switch (parameter.value) {
                        case true:
                            // remoteOperationStatus = RemoteOperationStatus.START;
                            remoteOperationStatus = true;
                            break;
                        // remoteOperation = RemoteOperation.STANDBY;
                        case false:
                            // remoteOperationStatus = RemoteOperationStatus.STOP;
                            remoteOperationStatus = false;
                            break;
                    }
                    break;
            }
        });

    return [remoteOperationStatus];
};

export const getStatusDEG = (status: boolean) => {
    switch (status) {
        case true:
            return "STARTED";
        case false:
            return "STOPPED";
    }
};

export const getStatusTypeDEG = (status: string) => {
    switch (status) {
        case "GENERATING":
            return "success";
        case "MANUAL":
            return "warning";
        case "AUTO":
            return "success";
        case "STANDBY":
            return "warning";
        case "FAILED":
            return "error";
    }
};

export const getStatusTypeRemoteOperationToFuelLevel = (status: string) => {
    switch (status) {
        case "ON":
            return "success";
        case "STANDBY":
            return "warning";
        case "N/A":
            return "error";
        case "COMMERCIAL POWER":
            return "success";
        case "GENERATOR":
            return "success";
        case "LOW":
            return "error";
        case "HIGH":
            return "success";
    }
};
