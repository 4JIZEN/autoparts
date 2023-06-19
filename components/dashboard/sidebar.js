import { useState, useEffect } from "react";
import {
    FaBars,
    FaTimes,
    FaMoneyBillAlt,
    FaShoppingCart,
    FaClipboardList,
    FaTags,
    FaBoxOpen,
    FaUsers,
    FaSignOutAlt,
} from "react-icons/fa";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Sidebar() {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            function handleResize() {
                setShowMenu(window.innerWidth > 768);
            }

            window.addEventListener("resize", handleResize);

            handleResize();

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <div className="bg-black/90 text-white py-4 px-2 flex-none md:w-64">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center md:hidden">
                        <h1 className="text-lg font-bold text-center">Logo</h1>
                    </div>
                    <div className="hidden md:flex items-center">
                        <h1 className="text-lg font-bold text-center md:text-left">
                            Autopart Dashboard
                        </h1>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setShowMenu(!showMenu)}>
                            {showMenu ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
                <hr className="my-4 border-gray-600 md:block hidden" />
                <nav className={`${showMenu ? "block" : "hidden"} mt-4`}>
                    <ul>
                        <li>
                            <Link
                                className="flex items-center py-2 px-4 text-white/75 hover:bg-black rounded"
                                href="/dashboard/"
                            >
                                <FaClipboardList className="mr-2" />
                                ออเดอร์
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center py-2 px-4 text-white/75 hover:bg-black rounded"
                                href="/dashboard/claim"
                            >
                                <FaTags className="mr-2" />
                                เคลมสินค้า
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center py-2 px-4 text-white/75 hover:bg-black rounded"
                                href="/dashboard/category"
                            >
                                <FaBoxOpen className="mr-2" />
                                หมวดหมู่
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center py-2 px-4 text-white/75 hover:bg-black rounded"
                                href="/dashboard/product"
                            >
                                <FaShoppingCart className="mr-2" />
                                รายการสินค้า
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center py-2 px-4 text-white/75 hover:bg-black rounded"
                                href="/dashboard/user"
                            >
                                <FaUsers className="mr-2" />
                                ผู้ใช้
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center py-2 px-4 text-white/75 hover:bg-black rounded"
                                href="/dashboard/promptpay"
                            >
                                <FaMoneyBillAlt className="mr-2" />
                                พร้อมเพย์
                            </Link>
                        </li>
                        <li>
                            <div
                                className="flex items-center cursor-pointer py-2 px-4 text-white/75 hover:bg-black rounded"
                                onClick={() =>
                                    signOut({
                                        callbackUrl: `${window.location.origin}`,
                                    })
                                }
                            >
                                <FaSignOutAlt className="mr-2" />
                                ออกจากระบบ
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
