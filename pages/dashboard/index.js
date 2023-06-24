import Layout from "@/components/dashboard";
import Header from "@/components/dashboard/header";
import Table from "@/components/dashboard/table";
import Model from "@/components/dashboard/model";

import axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as dayjs from "dayjs";

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
                        const { payment_status, received, address, ...rest } =
                            obj;
                        // return rest;
                        return {
                            ...rest,
                            created_at: dayjs(rest.created_at).format(
                                "DD-MM-YYYY HH:mm:ss"
                            ),
                            updated_at: dayjs(rest.updated_at).format(
                                "DD-MM-YYYY HH:mm:ss"
                            ),
                        };
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
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [optPayment, setOptPayment] = useState(<></>);

    const handleClose = () => {
        onClose();
    };

    const handlePaymentStatusChange = (e) => {
        setOrder((prev) => {
            return { ...prev, payment_status: e.target.value };
        });
        setPaymentStatus(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/order?id=${order?.id}`, {
                payment_status: paymentStatus,
            });
            toast.success("บันทึกสำเร็จ");
        } catch (err) {
            toast.error("เกิดข้อผิดพลาด");
            console.error(err);
        }
    };

    useEffect(() => {
        setOptPayment(
            <select
                id="payment_status"
                value={order?.payment_status}
                onChange={handlePaymentStatusChange}
                className="ml-2 py-2 px-4 border border-gray-300 rounded text-gray-800 focus:outline-none focus:border-blue-500"
            >
                <option value="">-- เลือก --</option>
                <option value={true}>ชำระสำเร็จ</option>
                <option value={false}>ยังไม่ได้ชำระ</option>
            </select>
        );
    }, [order]);

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

            setPaymentStatus(d?.payment_status);

            setOrder(d);
        };

        if (data?.id) {
            fetchOrder();
        }
    }, [data]);

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">รายละเอียดออเดอร์</h2>

            <div className="flex flex-row w-full justify-around">
                <div className="mx-4 my-2">
                    <form className="space-y-4">
                        <div className="flex items-center">
                            <label
                                htmlFor="customer"
                                className="font-bold text-gray-600"
                            >
                                ชื่อลูกค้า:
                            </label>
                            <p id="customer" className="ml-2 text-gray-800">
                                {order?.customer}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <label
                                htmlFor="created_at"
                                className="font-bold text-gray-600"
                            >
                                วันที่สั่งซื้อ:
                            </label>
                            <p id="created_at" className="ml-2 text-gray-800">
                                {dayjs(order?.created_at).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                )}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <label
                                htmlFor="payment"
                                className="font-bold text-gray-600"
                            >
                                การชำระเงิน:
                            </label>
                            <p id="payment" className="ml-2 text-gray-800">
                                {order?.payment === "qr"
                                    ? "สแกนคิวอาร์"
                                    : "เก็บเงินปลายทาง"}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <label
                                htmlFor="payment_status"
                                className="font-bold text-gray-600"
                            >
                                สถานะการชำระเงิน:
                            </label>
                            {/* <select
                                id="payment_status"
                                value={paymentStatus}
                                onChange={handlePaymentStatusChange}
                                className="ml-2 py-2 px-4 border border-gray-300 rounded text-gray-800 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">-- เลือก --</option>
                                <option value="1">ชำระสำเร็จ</option>
                                <option value="0">ยังไม่ได้ชำระ</option>
                            </select> */}
                            {optPayment}
                        </div>
                        <div className="flex items-center">
                            <label
                                htmlFor="price"
                                className="font-bold text-gray-600"
                            >
                                ราคารวม:
                            </label>
                            <p id="price" className="ml-2 text-gray-800">
                                {order?.price} บาท
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleFormSubmit}
                        >
                            อัพเดด
                        </button>
                    </form>
                </div>

                <div className="mx-4 my-2">
                    <img
                        src={order?.received}
                        alt="Selected"
                        className="mt-2"
                    />
                </div>
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
