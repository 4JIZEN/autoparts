import {
    FaSearch,
    FaShoppingCart,
    FaUser,
    FaCheck,
    FaSignInAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Navbar({ onSearchChange }) {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);
    const [cartData, setCartData] = useState(null);

    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        onSearchChange(e.target.value);
    };

    const fetchData = async () => {
        await axios
            .get(`/api/carts?user_id=${userData?.id}`)
            .then((response) => {
                setCartData(response.data);
            });
    };

    useEffect(() => {
        fetchData();
    }, [userData]);

    useEffect(() => {
        const fetchUser = async () => {
            await axios
                .get(`/api/user?email=${session?.user.email}`)
                .then((response) => {
                    if (response?.data) {
                        setUserData(response.data);
                    }
                })
                .catch((error) => console.log(error));
        };

        fetchUser();
    }, [session]);

    return (
        <nav className="bg-blue-500 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="text-white ml-2 text-2xl">Autoparts</h1>
                </Link>
            </div>

            <div className="flex items-center">
                <div className="relative mr-4">
                    <input
                        type="text"
                        placeholder="ค้นหาสินค้า"
                        value={searchValue}
                        onChange={handleChange}
                        className="bg-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:shadow-outline"
                    />
                    <span className="absolute top-0 left-0 mt-3 ml-3">
                        <FaSearch className="text-gray-500" />
                    </span>
                </div>

                <Link href="/claim">
                    <button className="btn btn-ghost btn-circle text-white">
                        <FaCheck className="text-xl" />
                    </button>
                </Link>
                <Link
                    href="/cart"
                    className="btn btn-ghost btn-circle text-white"
                >
                    <FaShoppingCart className="text-xl" />
                </Link>

                {session?.user ? (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="rounded-full text-white">
                                <FaUser className="text-xl" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link
                                    href="/user/account"
                                    className="justify-between"
                                >
                                    ข้อมูลส่วนตัว
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/purchased">
                                    ประวัติการซื้อ
                                </Link>
                            </li>
                            <li>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut();
                                    }}
                                >
                                    ออกจากระบบ
                                </a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link href="/signin">
                        <button className="btn btn-ghost btn-circle text-white">
                            <FaSignInAlt className="text-xl" />
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
