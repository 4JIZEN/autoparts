import Layout from "@/components/dashboard";
import Header from "@/components/dashboard/header";
import Table from "@/components/dashboard/table";
import Model from "@/components/dashboard/model";

import axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";
export default function Orders() {
    const [data, setData] = useState([]);
    const [isOpenWatch, setIsOpenWatch] = useState(false);
    const [currentData, setCurrentData] = useState(null);

    const handleWatchOpen = (id) => {
        setCurrentData(() => data.find((d) => d.id === id));
        setIsOpenWatch(true);
    };

    const handleDelete = async (id) => {
        if (confirm("confirm to delete?")) {
            try {
                const deleted = await axios.delete(`/api/roder?id=${id}`);
                if (deleted.status === 200) {
                    await getOrder();
                    toast.success("ลบสำเร็จ");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getOrder = async () => {
        await axios
            .get("/api/order")
            .then((response) => {
                setData(
                    response.data.map((obj) => {
                        const { payment_status, ...rest } = obj;
                        return rest;
                    })
                );
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <Layout title="ออเดอร์">
            <Header title="ออเดอร์" onAdd={false} />
            <ToastContainer />
            <Table
                data={data}
                onWatch={handleWatchOpen}
                onEdit={false}
                onDelete={handleDelete}
            />

            <ModelWatch
                isOpen={isOpenWatch}
                data={currentData}
                onClose={() => setIsOpenWatch(false)}
            />
        </Layout>
    );
}

function ModelWatch({ isOpen, data, onClose }) {
    const [order, setOrder] = useState(null);

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        const fetchOrder = async () => {
            const order = await axios
                .get(`/api/order?id=${data?.id}`)
                .then((response) => response.data[0]);

            const user = await axios
                .get(`/api/user?id=${order.user_id}`)
                .then((response) => response.data);

            const orderProd = await axios
                .get(`/api/orderprod?order_id=${data?.id}`)
                .then((res) => {
                    return res.data;
                });

            const productPromises = orderProd.map(async (op) => {
                const { title, price, image } = await axios
                    .get(`/api/product?id=${op.prod_id}`)
                    .then((res) => res.data[0]);

                return { title, price, image, qty: op.qty };
            });

            const products = await Promise.all(productPromises);

            const d = {
                ...order,
                customer: `${user.firstname} ${user.lastname}`,
                products: products,
            };
            setOrder(d);
        };

        if (data?.id) {
            fetchOrder();
        }
    }, [data]);

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">รายละเอียดออเดอร์</h2>

            <div className="mx-4 my-2">
                <p> ชื่อลูกค้า: {order?.customer}</p>
                <p>
                    วันที่สั่งซื้อ : {moment(order?.created_at).format("LLLL")}
                </p>
                <p> การชำระเงิน : {order?.payment}</p>
                <p>
                    สถานะการชำระเงิน :{" "}
                    {order?.payment_status ? "ชำระสำเร็จ" : "ยังไม่ได้ชำระ"}
                </p>
                <p> ราคารวม : {order?.price} บาท</p>
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-black/25">
                        <th className="py-3 px-6 text-left">รูป</th>
                        <th className="py-3 px-6 text-left">ชื่อ</th>
                        <th className="py-3 px-6 text-left">ราคา</th>
                        <th className="py-3 px-6 text-left">จำนวน</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.products.map((product, index) => (
                        <tr key={index}>
                            <td className="py-3 px-2 text-left border-b border-gray-200">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-24 h-auto mb-2 rounded"
                                />
                            </td>
                            <td className="py-3 px-6 text-left border-b border-gray-200">
                                {product.title}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-gray-200">
                                {product.price}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-gray-200">
                                {product.qty}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Model>
    );
}
