import { useState } from "react";
import ChangePasswordInput from "~/components/ChangePasswordInput";

const selectedTabStyle =
    "border-b-[3px] border-[#DC000C] text-[#DC000C] cursor-default";

export default function Settings() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <>
            <main
                className={`flex min-h-screen w-full flex-col items-start justify-start space-y-8 bg-[#202020] px-24 py-24 font-normal text-primary lg:px-80 `}
            >
                <h1 className="text-3xl font-bold">Settings</h1>
                <div className="flex w-full flex-row items-start border-b-2 border-secondary">
                    <div
                        onClick={() => setSelectedTab(0)}
                        className={`w-fit p-3 text-xl font-bold transition-all duration-200 ${
                            selectedTab === 0
                                ? selectedTabStyle
                                : `cursor-pointer text-white hover:text-[#febfc3]`
                        }`}
                    >
                        General
                    </div>
                    <div
                        onClick={() => setSelectedTab(1)}
                        className={`w-fit p-3 text-xl font-bold transition-all duration-200  ${
                            selectedTab === 1
                                ? selectedTabStyle
                                : `cursor-pointer text-white hover:text-[#febfc3]`
                        }`}
                    >
                        Account
                    </div>
                </div>
                {/* content container */}
                <div className="flex w-full flex-col">
                    {/* GENERAL TAB */}
                    {selectedTab === 0 && (
                        <form className="flex h-fit w-full flex-col space-y-8">
                            {/* Dashboard Settings */}
                            <div className="text-md flex flex-col space-y-4">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Dashboard Settings
                                </h1>
                                <div className="flex w-full flex-col space-y-7 bg-base-100 p-7">
                                    <div className="flex flex-col space-y-2">
                                        <h2 className=" text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Header Title
                                        </h2>
                                        {/* Header Title */}
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="HeaderTitle"
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Sub-header Title
                                        </h2>
                                        {/* Sub-Header Title */}
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="SubHeaderTitle"
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Generator Settings */}
                            <div className="text-md flex flex-col space-y-4">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Generator Settings
                                </h1>

                                {/* Generator 1 Title */}
                                <div className="flex w-full flex-col space-y-7 bg-base-100 p-7">
                                    <div className="flex flex-col space-y-2">
                                        <h2 className=" text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Generator No. 1 Title
                                        </h2>
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="GeneratorTitle1"
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div>

                                    {/* Generator 2 Title */}
                                    <div className="flex flex-col space-y-2">
                                        <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Generator No. 2 Title
                                        </h2>
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="GeneratorTitle2"
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div>

                                    {/* Generator 3 Title */}
                                    <div className="flex flex-col space-y-2">
                                        <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Generator No. 3 Title
                                        </h2>
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="GeneratorTitle3"
                                                type="text"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Form Buttons */}
                            <div className="flex w-full flex-row gap-5">
                                {/* CANCEL BTN */}
                                <button
                                    type="button"
                                    // onClick={props.closeModal}
                                    className="h-[3rem] border-[1px] border-[#CCCCCC] px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] duration-200 hover:bg-accent focus:bg-secondary"
                                    // disabled={isSubmitting}
                                >
                                    Discard Changes
                                </button>

                                {/* SUBMIT BTN */}
                                <button
                                    type="button"
                                    // onClick={props.submitModal}
                                    className="h-[3rem] border-[1px] border-success bg-success px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] text-white duration-200 hover:bg-[#5ec772] focus:bg-[#3d8b4b]"
                                    // disabled={isSubmitting}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ACCOUNT TAB */}
                    {selectedTab === 1 && (
                        <form className="flex h-fit w-full flex-col space-y-8">
                            {/* Dashboard Settings */}
                            <div className="text-md flex flex-col space-y-4">
                                <h1 className="text-sm font-semibold uppercase tracking-[0.2em]">
                                    Change Password
                                </h1>
                                <div className="flex w-full flex-col space-y-7 bg-base-100 p-7">
                                    <div className="flex flex-col space-y-2">
                                        <h2 className=" text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                            Old Password
                                        </h2>
                                        {/* Old Password */}
                                        <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                            <input
                                                id="OldPassword"
                                                type="password"
                                                className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                placeholder="TYPE HERE..."
                                            />
                                        </label>
                                    </div>

                                    <div className="flex flex-row gap-7">
                                        {/* New Password */}
                                        <div className="flex w-full flex-col space-y-2">
                                            <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                                New Password
                                            </h2>
                                            <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                                <input
                                                    id="NewPassword"
                                                    type="password"
                                                    className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d]"
                                                    placeholder="TYPE HERE..."
                                                />
                                            </label>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="flex w-full flex-col space-y-2">
                                            <h2 className="text-sm font-normal uppercase tracking-widest text-[#CCCCCC]">
                                                Confirm Password
                                            </h2>
                                            <label className="input w-full items-center gap-4 rounded-none bg-secondary">
                                                <input
                                                    id="ConfirmPassword"
                                                    type="password"
                                                    className="w-full grow bg-secondary p-3 font-normal text-[#CCCCCC] placeholder:text-xs placeholder:tracking-[0.2em] placeholder:text-[#8d8d8d] "
                                                    placeholder="TYPE HERE..."
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* <ChangePasswordInput /> */}
                            </div>

                            {/* Form Buttons */}
                            <div className="flex w-full flex-row gap-5">
                                {/* DISCARD BTN */}
                                <button
                                    type="button"
                                    // onClick={props.closeModal}
                                    className="h-[3rem] border-[1px] border-[#CCCCCC] px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] duration-200 hover:bg-accent focus:bg-secondary"
                                    // disabled={isSubmitting}
                                >
                                    Discard Changes
                                </button>

                                {/* SAVE BTN */}
                                <button
                                    type="button"
                                    // onClick={props.submitModal}
                                    className="h-[3rem] border-[1px] border-success bg-success px-[1.5rem] text-center text-xs font-normal uppercase tracking-[0.2em] text-white duration-200 hover:bg-[#5ec772] focus:bg-[#3d8b4b]"
                                    // disabled={isSubmitting}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </>
    );
}
