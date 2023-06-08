import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";

export default function Purchased() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const orders = await axios
                .get(`/api/order?user_id=${userData?.id}`)
                .then((response) => response.data);

            const data = await Promise.all(
                orders.map(async (order) => {
                    const orderProd = await axios
                        .get(`/api/orderprod?order_id=${order.id}`)
                        .then((res) => res.data);

                    const productPromises = orderProd.map(async (op) => {
                        const product = await axios
                            .get(`/api/product?id=${op.prod_id}`)
                            .then((res) => res.data);
                        return product[0];
                    });

                    const products = await Promise.all(productPromises);

                    return { ...order, products: products };
                })
            );

            setOrders(data);
        };

        fetchOrder();
    }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`/api/user?email=${session?.user.email}`)
                .then((response) => {
                    if (response?.data) {
                        setUserData(response.data);
                    }
                })
                .catch((error) => console.error(error));
        };

        fetchData();
    }, [session]);

    return (
        <Layout>
            <Navbar onSearchChange={() => {}} />

            <div className="container mx-auto py-8 w-[60%]">
                <h1 className="text-3xl font-bold mb-4">ประวัติการสั่งซื้อ</h1>
                {orders?.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded shadow-md mb-8 p-6"
                    >
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl font-bold mb-4">
                                ออเดอร์ไอดี : {order.id}
                            </h2>
                            <h2 className="text-lg mb-4">
                                {moment(order.created_at).format("LLLL")}
                            </h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {order.products.map((product) => (
                                <div
                                    key={product.id}
                                    className="border border-gray-300 p-4 rounded flex flex-col"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-auto mb-2 rounded"
                                    />
                                    <p className="text-lg font-semibold mb-auto">
                                        {product.name}
                                    </p>
                                    <p className="text-gray-500 self-end">
                                        {product.price} THB
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="text-xl font-bold">
                            รวมราคา: {order.price} THB
                        </p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
