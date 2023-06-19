import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export default function Cart() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);
    const [carts, setCarts] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`/api/carts?prod_id=${id}`);
            toast.success("ลบสำเร็จ");
            setRefresh(true);
        } catch (e) {
            console.error(e);
            toast.error("ไม่สามารถทำรายการได้");
        }
    };

    const calculateTotalPrice = (data) => {
        let totalPrice = 0;

        for (let i = 0; i < data.length; i++) {
            const { qty, product } = data[i];
            totalPrice += qty * product.price;
        }

        return totalPrice;
    };

    const fetchData = async () => {
        try {
            const carts = await axios
                .get(`/api/carts?user_id=${userData?.id}`)
                .then((response) => response.data)
                .then(async (responseData) => {
                    const cartPromises = responseData.map(async (cart) => {
                        const product = await axios
                            .get(`/api/product?id=${cart.prod_id}`)
                            .then((response) => response.data[0]);

                        return {
                            ...cart,
                            product: product,
                        };
                    });

                    return Promise.all(cartPromises);
                });
            setCarts(carts);
            setRefresh(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userData, refresh]);

    useEffect(() => {
        const fetchUser = async () => {
            await axios
                .get(`/api/user?email=${session?.user.email}`)
                .then((response) => {
                    if (response?.data) {
                        setUserData(response.data);
                    }
                })
                .catch((error) => console.err(error));
        };

        fetchUser();
    }, [session]);

    return (
        <Layout>
            <Navbar onSearchChange={() => {}} />
            <ToastContainer />
            <div className="container mx-auto py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Cart</h1>

                    {carts?.length > 0 ? (
                        <>
                            {carts.map((cart) => (
                                <div
                                    key={cart.id}
                                    className="bg-white p-6 rounded mb-4"
                                >
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={cart.product.image}
                                            alt={cart.product.title}
                                            className="w-16 h-16 mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {cart.product.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                จำนวน : {cart.qty} &times; ราคา
                                                : {cart.product.price} บาท
                                            </p>
                                        </div>
                                        <button
                                            className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={() =>
                                                handleRemoveItem(
                                                    cart.product.id
                                                )
                                            }
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-white p-6 rounded mb-8">
                                <h2 className="text-2xl font-bold mb-4">
                                    รวมราคา
                                </h2>
                                <p className="text-xl font-semibold">
                                    {calculateTotalPrice(carts)} บาท
                                </p>
                            </div>

                            <Link
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                href={`/checkouts/${userData?.id}`}
                            >
                                สั่งซื้อ
                            </Link>
                        </>
                    ) : (
                        <p className="text-xl">ไม่มีสินค้าในตะกร้า</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
