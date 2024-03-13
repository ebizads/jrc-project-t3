import React from "react";
import Image from "next/image";

const HeaderNav = () => {
    return (
        <>
            <div className="navbar  px-10">
                <div className="flex-1">
                    <div className="relative">
                        <Image
                            src="/images/JRC_Logo_Dark.png"
                            alt="JRC Logo"
                            // layout="fill"
                            width={200}
                            height={0}
                        />
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        {/* <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                        /> */}
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="avatar btn btn-circle btn-ghost"
                        >
                            <div className=" w-10 rounded-full bg-info">
                                {/* <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                /> */}
                                <i className="fa-solid fa-user mt-2 text-3xl text-secondary"></i>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                            <li>
                                <a className="justify-between">
                                    Profile
                                    {/* <span className="badge">New</span> */}
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderNav;
