
export const getDataValueEquivalent = (
    statusName: string,
    value: boolean
) => {
    switch (statusName) {
        case "COMMERCIAL POWER":
            switch (value) {
                case true:
                    return "ON"
                case false:
                    return "OFF"
            }
        case "DEG MODE":
            switch (value) {
                case true:
                    return "GENERATING"
                case false:
                    return "MANUAL"
            }
        // return [
         // ];
        case "DEG STATUS":
            switch (value) {
                case true:
                    return "GENERATING"
                case false:
                    return "FAILED"
            }
        // return [
        //     { key: "status1", option: "FAILED" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "GENERATING" },
        // ];
        case "REMOTE OPERATION":
            switch (value) {
                case true:
                    return "ON"
                case false:
                    return "N/A"
            }
        // return [
        //     { key: "status1", option: "ON" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "N/A" },
        // ];
        case "LOAD ON":
            switch (value) {
                case true:
                    return "COMMERCIAL POWER"
                case false:
                    return "GENERATOR"
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
                    return "COMMERCIAL POWER"
                case false:
                    return "GENERATOR"
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
                    return "OPERATING"
                case false:
                    return "ALARM"
            }
            // return [
            //     { key: "status1", option: "ALARM", color: redGlow },
            //     { key: "status2", option: "OPERATING", color: greenGlow },
            // ];
        case "COMMERCIAL POWER":
            switch (value) {
                case true:
                    return "ON"
                case false:
                    return "OFF"
            }
            // return [
            //     { key: "status1", option: "OFF", color: redGlow },
            //     { key: "status2", option: "ON", color: greenGlow },
            // ];
        case "BATTERY TEMPERATURE":
            switch (value) {
                case true:
                    return "HIGHT"
                case false:
                    return "GOOD"
            }
            // return [
            //     { key: "status1", option: "HIGH", color: redGlow },
            //     { key: "status2", option: "GOOD", color: greenGlow },
            // ];
        default:
            return "";
    }
}
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
                    return "ON"
                case false:
                    return "OFF"
            }
        case "DEG MODE":
            switch (value) {
                case true:
                    return "GENERATING"
                case false:
                    return "MANUAL"
            }
        // return [
        //     { key: "status1", option: "GENERATING" },
        //     { key: "status2", option: "MANUAL" },
        //     { key: "status3", option: "AUTO" },
        // ];
        case "DEG STATUS":
            switch (value) {
                case true:
                    return "GENERATING"
                case false:
                    return "FAILED"
            }
        // return [
        //     { key: "status1", option: "FAILED" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "GENERATING" },
        // ];
        case "UNDER_REMOTE_OPERATION":
            switch (value) {
                case true:
                    return "ON"
                case false:
                    return "N/A"
            }
        // return [
        //     { key: "status1", option: "ON" },
        //     { key: "status2", option: "STANDBY" },
        //     { key: "status3", option: "N/A" },
        // ];
        case "LOAD ON":
            switch (value) {
                case true:
                    return "COMMERCIAL POWER"
                case false:
                    return "GENERATOR"
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
                    return "COMMERCIAL POWER"
                case false:
                    return "GENERATOR"
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
                    return "OPERATING"
                case false:
                    return "ALARM"
            }
            // return [
            //     { key: "status1", option: "ALARM", color: redGlow },
            //     { key: "status2", option: "OPERATING", color: greenGlow },
            // ];
        case "COMMERCIAL POWER":
            switch (value) {
                case true:
                    return "ON"
                case false:
                    return "OFF"
            }
            // return [
            //     { key: "status1", option: "OFF", color: redGlow },
            //     { key: "status2", option: "ON", color: greenGlow },
            // ];
        case "BATTERY_HIGH_TEMPERATURE":
            switch (value) {
                case true:
                    return "HIGHT"
                case false:
                    return "GOOD"
            }
            // return [
            //     { key: "status1", option: "HIGH", color: redGlow },
            //     { key: "status2", option: "GOOD", color: greenGlow },
            // ];
        default:
            return "";
    }
}