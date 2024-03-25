import { StatusDiagramProps } from "~/utils/types";

// Line Colors
const greenLine = "bg-[#80D088]";
const greenBorder = "border-[#80D088]";
const greenLineGradient = "from-[#306536] to-[#80D088]";

const yellowLine = "bg-[#FFFA8B]";
const yellowBorder = "border-[#FFFA8B]";
const yellowLineGradient = "from-[#57540D] to-[#FFFA8B]";

const redLine = "bg-[#F08288]";
const redBorder = "border-[#F08288]";
const redLineGradient = "from-[#8E282D] to-[#F08288]";

// Box Colors
const greenParent =
    " h-full w-1/3 bg-gradient-to-tr from-[#306536] via-[#80D088] to-[#306536] p-[1px] ";
const greenChild =
    " w-full h-full items-center p-5 text-center font-semibold uppercase tracking-widest bg-gradient-to-tr from-[#44774A] via-[#2E362E] to-[#44774A] text-[#80D088] ";
const yellowParent =
    "h-full bg-gradient-to-tr from-[#57540D] via-[#FFFA8B] to-[#57540D] p-[1px]";
const yellowChild =
    " h-full items-center p-5 text-center font-semibold uppercase tracking-widest bg-gradient-to-tr from-[#6B6843] via-[#2B2B25] to-[#6B6843] text-center tracking-widest text-[#FFFA8B] ";
const redParent =
    "h-full w-1/3 bg-gradient-to-tr from-[#8E282D] via-[#F08288] to-[#8E282D] p-[1px]";
const redChild =
    " w-full h-full items-center p-5 text-center font-semibold uppercase tracking-widest bg-gradient-to-tr from-[#462D2F] via-[#292626] to-[#462D2F] text-center tracking-widest text-[#F08288] ";

const StatusDiagram = (statusDiagram: StatusDiagramProps) => {
    //Get the colors where the load is directed, whether from COMMERCIAL POWER or GENERATOR
    const [
        CP_boxBorder,
        CP_boxInner,
        CP_outerLine,
        CP_innerLine,
        CP_dotColor,
        CP_isLoaded,
    ] = getCPColor(statusDiagram.loadStatus);

    const [
        DEG_boxBorder,
        DEG_boxInner,
        DEG_outerLine,
        DEG_innerLine,
        DEG_dotColor,
    ] = getDEGColor(statusDiagram.genStatus);

    return (
        <div className="flex flex-col">
            <div className="flex w-full flex-row  text-xs tracking-wider">
                {/* COMMERCIAL POWER BOX */}
                <div className="flex h-full w-1/3 flex-row items-center">
                    <div className={`${CP_boxBorder} w-full rounded-full`}>
                        <div
                            className={`${CP_boxInner} rounded-full text-[11px]`}
                        >
                            Commercial
                            <br />
                            Power
                        </div>
                    </div>
                </div>
                {/* outer left line */}
                <div
                    className={`mt-[2.5rem] h-[2px] w-[80%] bg-gradient-to-r ${CP_outerLine}`}
                />
                {/* ACP */}
                <div className="relative flex h-full w-1/3 items-center justify-center">
                    <div className="relative flex h-full w-[100px] flex-row">
                        {/* middle column */}
                        <div className=" flex w-[35rem] flex-col items-center ">
                            {/* INNER GRAY BOX */}
                            <div className=" relative flex h-32 w-full flex-row justify-center rounded-lg bg-[#1F1F1F] pt-2 text-center text-[11px] font-semibold uppercase text-info">
                                <div className="absolute tracking-widest">
                                    ACP
                                </div>
                                {/* COMMERCIAL POWER inner left line */}
                                <div
                                    className={`relative mt-[2rem] h-[2px] w-[45%] ${CP_innerLine}`}
                                />

                                {/* center dots and line */}
                                <div className="flex w-[16px] flex-col items-center">
                                    {/*COMMERCIAL POWER middle dot upper */}
                                    <div
                                        className={`mt-[1.65rem] h-[16px] w-[16px] rounded-full border-2 ${CP_dotColor}`}
                                    />
                                    {/* GENERATOR middle dot lower */}
                                    <div
                                        className={`mt-11  h-[16px] w-[16px] rounded-full border-2 ${DEG_dotColor}`}
                                    />
                                    {/* GENERATOR center line inner */}
                                    <div
                                        className={`h-5 w-[2px] ${DEG_innerLine}`}
                                    />
                                    {/* GENERATOR center line outer */}
                                    <div className="absolute mt-[7.5rem] flex w-[20px] flex-col items-center justify-center">
                                        <div
                                            className={`h-5 w-[2px] bg-gradient-to-t ${DEG_outerLine}`}
                                        />
                                    </div>
                                </div>

                                {/* middle dot right */}
                                <div
                                    className={`mt-14 h-[16px] w-[16px] rounded-full border-2 ${greenBorder}`}
                                />
                                {/* inner right line */}
                                <div
                                    className={` mt-[3.9rem] h-[2px] w-[30%] ${greenLine}`}
                                />

                                {/* MOVING LINE */}
                                <div
                                    className={
                                        "absolute mr-[0.25rem] mt-[3.55rem] w-[47%] origin-[86%_50%] transform transition-all duration-300 " +
                                        (CP_isLoaded
                                            ? "rotate-[63deg] "
                                            : "rotate-[-62deg]")
                                    }
                                >
                                    <div className="flex flex-row items-center">
                                        <div
                                            className={`h-[14px] w-[70%] rounded-full ${greenLine}`}
                                        />
                                        <div
                                            className={`h-[2px] w-full ${greenLine}`}
                                        ></div>
                                        <div
                                            className={`h-[14px] w-[70%] rounded-full ${greenLine}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* outer right line */}
                <div
                    className={`mt-[4.4rem] h-[2px] w-[80%] bg-gradient-to-l ${greenLineGradient}`}
                />
                {/* LOAD BOX */}
                <div className={`${greenParent} mt-9 rounded-xl`}>
                    <div className={`${greenChild} rounded-xl text-2xl`}>
                        Load
                    </div>
                </div>
            </div>

            {/* DEG BOX */}
            <div className="flex w-full flex-row justify-center pt-5  text-xs tracking-wider">
                <div className={`${DEG_boxBorder} rounded-xl`}>
                    <div className={`${DEG_boxInner} rounded-xl text-[11px]`}>
                        <div className=" text-center text-2xl font-semibold uppercase tracking-widest">
                            Deg
                        </div>
                        <div className=" justify-self-center text-center text-[11px] font-semibold uppercase">
                            {statusDiagram.genStatus}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function getCPColor(
    loadType: string
): [string, string, string, string, string, boolean] {
    let CP_boxBorder: string;
    let CP_boxInner: string;
    let CP_outerLine: string;
    let CP_innerLine: string;
    let CP_dotColor: string;
    let CP_isLoaded: boolean;

    if (loadType === "COMMERCIAL POWER") {
        // GREEN
        CP_boxBorder = greenParent;
        CP_boxInner = greenChild;
        CP_outerLine = greenLineGradient;
        CP_innerLine = greenLine;
        CP_dotColor = greenBorder;
        CP_isLoaded = true;
    } else {
        // RED
        CP_boxBorder = redParent;
        CP_boxInner = redChild;
        CP_outerLine = redLineGradient;
        CP_innerLine = redLine;
        CP_dotColor = redBorder;
        CP_isLoaded = false;
    }
    return [
        CP_boxBorder,
        CP_boxInner,
        CP_outerLine,
        CP_innerLine,
        CP_dotColor,
        CP_isLoaded,
    ];
}

function getDEGColor(
    genStatus: string
): [string, string, string, string, string] {
    let DEG_boxBorder: string;
    let DEG_boxInner: string;
    let DEG_outerLine: string;
    let DEG_innerLine: string;
    let DEG_dotColor: string;

    if (genStatus === "GENERATING") {
        // GREEN
        DEG_boxBorder = greenParent;
        DEG_boxInner = greenChild;
        DEG_outerLine = greenLineGradient;
        DEG_innerLine = greenLine;
        DEG_dotColor = greenBorder;
    } else if (genStatus === "STANDBY") {
        // YELLOW
        DEG_boxBorder = yellowParent;
        DEG_boxInner = yellowChild;
        DEG_outerLine = yellowLineGradient;
        DEG_innerLine = yellowLine;
        DEG_dotColor = yellowBorder;
    } else {
        // RED
        DEG_boxBorder = redParent;
        DEG_boxInner = redChild;
        DEG_outerLine = redLineGradient;
        DEG_innerLine = redLine;
        DEG_dotColor = redBorder;
    }
    return [
        DEG_boxBorder,
        DEG_boxInner,
        DEG_outerLine,
        DEG_innerLine,
        DEG_dotColor,
    ];
}

export default StatusDiagram;
