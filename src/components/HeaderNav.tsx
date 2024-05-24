import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const HeaderNav = () => {
    return (
        <>
            <div className="navbar bg-neutral px-10">
                <div className="flex-1">
                    <Link className="relative" href="/dashboard">
                        <Image
                            src="/images/JRC_Logo_Dark.png"
                            alt="JRC Logo"
                            // layout="fill"
                            width={200}
                            height={0}
                        />
                    </Link>
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
                            className="flex items-center justify-center avatar btn btn-circle btn-ghost"
                        >

                            {/* <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                /> */}
                            <svg width="50" height="50" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25 4.16675C13.4937 4.16675 4.16663 13.4938 4.16663 25.0001C4.16663 36.5063 13.4937 45.8334 25 45.8334C36.5062 45.8334 45.8333 36.5063 45.8333 25.0001C45.8333 13.4938 36.5062 4.16675 25 4.16675ZM17.7083 19.7917C17.7083 18.8342 17.8969 17.886 18.2633 17.0013C18.6298 16.1167 19.1669 15.3129 19.844 14.6358C20.5211 13.9587 21.3249 13.4216 22.2096 13.0551C23.0942 12.6887 24.0424 12.5001 25 12.5001C25.9575 12.5001 26.9057 12.6887 27.7904 13.0551C28.675 13.4216 29.4789 13.9587 30.1559 14.6358C30.833 15.3129 31.3701 16.1167 31.7366 17.0013C32.103 17.886 32.2916 18.8342 32.2916 19.7917C32.2916 21.7256 31.5234 23.5803 30.1559 24.9477C28.7885 26.3152 26.9338 27.0834 25 27.0834C23.0661 27.0834 21.2114 26.3152 19.844 24.9477C18.4765 23.5803 17.7083 21.7256 17.7083 19.7917ZM38.0375 35.3834C36.478 37.3451 34.4954 38.9292 32.2378 40.0172C29.9802 41.1052 27.506 41.6691 25 41.6668C22.4939 41.6691 20.0197 41.1052 17.7621 40.0172C15.5045 38.9292 13.522 37.3451 11.9625 35.3834C15.3395 32.9605 19.9479 31.2501 25 31.2501C30.052 31.2501 34.6604 32.9605 38.0375 35.3834Z" fill="#B8B8B8" />
                            </svg>


                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 font-normal shadow"
                        >
                            {/* <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li> */}
                            <li>
                                <Link href="/settings">Settings</Link>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        signOut({
                                            callbackUrl: "/",
                                        })
                                    }>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderNav;
