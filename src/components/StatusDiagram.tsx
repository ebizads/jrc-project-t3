const greenParent =
    "h-full w-1/3 bg-gradient-to-tr from-[#306536] via-[#80D088] to-[#306536] p-[1px]";
const greenChild =
    " w-full h-full items-center px-2 py-5 text-center font-semibold uppercase tracking-widest bg-gradient-to-tr from-[#44774A] via-[#2E362E] to-[#44774A] text-[#80D088] ";
const yellowParent =
    "h-full bg-gradient-to-tr from-[#57540D] via-[#FFFA8B] to-[#57540D] p-[1px]";
const yellowChild =
    " h-full items-center px-2 py-5 text-center font-semibold uppercase tracking-widest bg-gradient-to-tr from-[#6B6843] via-[#2B2B25] to-[#6B6843] text-center tracking-widest text-[#FFFA8B] ";
const redParent =
    "h-full w-1/3 bg-gradient-to-tr from-[#8E282D] via-[#F08288] to-[#8E282D] p-[1px]";
const redChild =
    " w-full h-full items-center px-2 py-5 text-center font-semibold uppercase tracking-widest bg-gradient-to-tr from-[#462D2F] via-[#292626] to-[#462D2F] text-center tracking-widest text-[#F08288] ";

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

                {/* ACP */}
                <div className="flex h-full w-1/3 flex-row">
                    {/* outer left line */}
                    <div className=" mt-[2.4rem] h-[2px] w-full bg-gradient-to-l from-[#FFFA8B] to-[#57540D] " />

                    {/* middle column */}
                    <div className=" flex w-[35rem] flex-col items-center ">
                        {/* INNER GRAY BOX */}
                        <div className=" relative flex h-32 w-full flex-row justify-center rounded-lg bg-[#1F1F1F] pt-2 text-center text-[11px] font-semibold uppercase text-info">
                            <div className="absolute tracking-widest">ACP</div>
                            {/* inner left line */}
                            <div className="relative mt-[1.9rem] h-[2px] w-[55%] bg-[#FFFA8B] " />

                            {/* center dots and line */}
                            <div className="flex w-[20px] flex-col items-center">
                                {/* middle dot upper */}
                                <div className="mt-6 h-[14px] w-full rounded-full border-2 border-[#FFFA8B] " />
                                {/* middle dot upper */}
                                <div className="mt-12  h-[14px] w-full rounded-full border-2 border-[#F08288] " />
                                {/* center line inner */}
                                <div className=" h-5 w-[2px] bg-[#F08288] " />
                                {/* center line outer */}
                                <div className="absolute mt-[7.5rem] flex w-[20px] flex-col items-center justify-center">
                                    <div className="  h-5 w-[2px] bg-gradient-to-t from-[#8E282D] to-[#F08288] " />
                                </div>
                            </div>

                            {/* middle dot right */}
                            <div className="mt-14 h-[14px] w-[20px] rounded-full border-2 border-[#80D088] " />
                            {/* inner right line */}
                            <div className=" mt-[3.9rem] h-[2px] w-[30%] bg-[#80D088]" />
                        </div>
                    </div>

                    {/* outer right line */}
                    <div className=" mt-[4.4rem] h-[2px] w-full bg-gradient-to-l from-[#306536] to-[#80D088] " />
                </div>

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
                        <div className=" text-center text-xs font-semibold uppercase">
                            Generating
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDiagram;
