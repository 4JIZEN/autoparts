import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";

import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Product() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [amount, setAmount] = useState(1);

    const handleAddToCart = async () => {
        // Handle add to cart functionality
        console.log("Product added to cart");

        const user = await axios
            .get(`/api/user?email=${session.user.email}`)
            .then((res) => res.data);

        if (user?.id) {
            await axios.post(`/api/carts`, {
                user_id: user.id,
                prod_id: data.id,
                qty: amount,
            });

            toast.success("เพิ่มลงตะกร้าสำเร็จ");
        }
    };

    const getData = async () => {
        await axios
            .get(`/api/product?id=${router.query.slug}`)
            .then((response) => {
                setData(response.data[0]);
            });
    };
    useEffect(() => {
        getData();
    }, [router.query.slug]);

    return (
        <Layout>
            <Navbar onSearchChange={() => {}} />
            <ToastContainer />
            <div className="container mx-auto py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={data?.image}
                            alt={data?.title}
                            className="w-[50%]"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">
                            {data?.title}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">
                            {data?.description}
                        </p>
                        <p className="text-2xl font-bold mb-4">
                            {data?.price} THB
                        </p>
                        <div className="flex items-center mb-4">
                            <label
                                htmlFor="amount"
                                className="text-lg font-semibold mr-2"
                            >
                                จำนวน :
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={amount}
                                min="1"
                                onChange={(e) =>
                                    setAmount(Number(e.target.value))
                                }
                                className="border border-gray-300 px-3 py-2 rounded w-16"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={handleAddToCart}
                            >
                                <FaCartPlus className="mr-2" />
                                เพิ่มไปยังรถเข็น
                            </button>
                            <Link
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                href={`/checkout/${data?.id}/${amount}`}
                            >
                                <FaShoppingCart className="mr-2" />
                                ซื้อ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
