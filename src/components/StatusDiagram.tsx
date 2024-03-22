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

const StatusDiagram = () => {
    return (
        <div className="flex flex-col">
            <div className="flex w-full flex-row  text-xs tracking-wider">
                {/* COMMERCIAL POWER BOX */}
                <div className="flex h-full w-1/3 flex-row items-center">
                    <div className={`${yellowParent} w-full rounded-full`}>
                        <div
                            className={`${yellowChild} rounded-full text-[11px]`}
                        >
                            Commercial
                            <br />
                            Power
                        </div>
                    </div>
                </div>
                {/* outer left line */}
                <div className=" mt-[2.5rem] h-[2px] w-[80%] bg-gradient-to-l from-[#FFFA8B] to-[#57540D] " />
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
                                {/* inner left line */}
                                <div className="relative mt-[2rem] h-[2px] w-[45%] bg-[#FFFA8B] " />

                                {/* center dots and line */}
                                <div className="flex w-[16px] flex-col items-center">
                                    {/* middle dot upper */}
                                    <div className="mt-[1.65rem] h-[16px] w-[16px] rounded-full border-2 border-[#FFFA8B] " />
                                    {/* middle dot lower */}
                                    <div className="mt-11  h-[16px] w-[16px] rounded-full border-2 border-[#F08288] " />
                                    {/* center line inner */}
                                    <div className=" h-5 w-[2px] bg-[#F08288] " />
                                    {/* center line outer */}
                                    <div className="absolute mt-[7.5rem] flex w-[20px] flex-col items-center justify-center">
                                        <div className="  h-5 w-[2px] bg-gradient-to-t from-[#8E282D] to-[#F08288] " />
                                    </div>
                                </div>

                                {/* middle dot right */}
                                <div className="mt-14 h-[16px] w-[16px] rounded-full border-2 border-[#80D088] " />
                                {/* inner right line */}
                                <div className=" mt-[3.9rem] h-[2px] w-[30%] bg-[#80D088]" />

                                {/* MOVING LINE */}
                                <div className="absolute mr-[0.25rem] mt-[3.55rem] w-[47%] origin-[86%_50%] rotate-[-62deg] transform transition-all duration-300 hover:rotate-[63deg]">
                                    <div className="flex flex-row items-center">
                                        <div className=" h-[14px] w-[70%] rounded-full bg-[#80D088] " />
                                        <div className=" h-[2px] w-full bg-[#80D088] "></div>
                                        <div className=" h-[14px] w-[70%] rounded-full bg-[#80D088] " />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* outer right line */}
                <div className=" mt-[4.4rem] h-[2px] w-[80%] bg-gradient-to-l from-[#306536] to-[#80D088] " />
                {/* LOAD BOX */}
                <div className={`${greenParent} mt-9 rounded-xl`}>
                    <div className={`${greenChild} rounded-xl text-2xl`}>
                        Load
                    </div>
                </div>
            </div>

            {/* DEG BOX */}
            <div className="flex w-full flex-row justify-center pt-5  text-xs tracking-wider">
                <div className={`${redParent} rounded-xl`}>
                    <div className={`${redChild} rounded-xl text-[11px]`}>
                        <div className=" text-center text-2xl font-semibold uppercase tracking-widest">
                            Deg
                        </div>
                        <div className=" justify-self-center text-center text-[11px] font-semibold uppercase">
                            Generating
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDiagram;
