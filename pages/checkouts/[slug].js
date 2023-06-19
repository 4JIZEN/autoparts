import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";

import QRCode from "qrcode.react";
const generatePayload = require("promptpay-qr");

export default function Checkouts() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState("0648409132");
    const [amount, setAmount] = useState(1.0);
    const [qrCode, setqrCode] = useState("sample");

    const [selectedPayment, setSelectedPayment] = useState("cash");

    const handlePaymentSelection = (paymentOption) => {
        setSelectedPayment(paymentOption);

        if (paymentOption === "qr") {
            setqrCode(generatePayload(phoneNumber, { amount }));
        } else {
            setqrCode("");
        }
    };

    const [qty, setQty] = useState(null);

    const [userData, setUserData] = useState(null);
    const [carts, setCarts] = useState(null);

    const [elOverall, setElOverall] = useState(<></>);

    const handlePlaceOrder = async () => {
        await axios
            .post(`/api/order/`, {
                user_id: userData.id,
                price: calculateTotalPrice(carts),
                payment: selectedPayment,
            })
            .then(async (response) => {
                if (response.data) {
                    carts.map(async (cart) => {
                        await axios.post(`/api/orderprod/`, {
                            order_id: response.data.id,
                            prod_id: cart.product.id,
                            qty: cart.qty,
                        });

                        await axios.delete(`/api/carts?id=${cart.id}`);
                    });

                    toast.success("สั่งซื้อสำเร็จ");
                    setTimeout(() => {
                        router.push("/list");
                    }, 1000);
                }
            });
    };

    const calculateTotalPrice = (data) => {
        let totalPrice = 0;

        for (let i = 0; i < data.length; i++) {
            const { qty, product } = data[i];
            totalPrice += qty * product.price;
        }

        return totalPrice;
    };

    useEffect(() => {
        if (carts !== null) {
            setAmount(parseInt(calculateTotalPrice(carts || 0)));
            setElOverall(
                carts.map((cart) => (
                    <div key={cart.id} className="flex items-center mb-4">
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
                                จำนวน : {cart.qty} &times; ราคา:
                                {cart.product.price} บาท
                            </p>
                        </div>
                    </div>
                ))
            );
        }
    }, [carts]);

    useEffect(() => {
        if (router.isReady) {
            const fetchData = async () => {
                try {
                    const carts = await axios
                        .get(`/api/carts?user_id=${router.query.slug}`)
                        .then((response) => response.data)
                        .then(async (responseData) => {
                            const cartPromises = responseData.map(
                                async (cart) => {
                                    const product = await axios
                                        .get(`/api/product?id=${cart.prod_id}`)
                                        .then((response) => response.data[0]);

                                    return {
                                        ...cart,
                                        product: product,
                                    };
                                }
                            );

                            return Promise.all(cartPromises);
                        });
                    setCarts(carts);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchData();
        }
    }, [router.isReady]);

    useEffect(() => {
        const fetchUser = async () => {
            await axios
                .get(`/api/user?email=${session?.user.email}`)
                .then((response) => {
                    if (response?.data) {
                        setUserData(response.data);
                    }
                })
                .catch((error) => console.error(error));
        };

        fetchUser();
    }, [session]);

    return (
        <Layout>
            <Navbar onSearchChange={() => {}} />
            <ToastContainer />
            <div className="container mx-auto py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">ทำการสั่งซื้อ</h1>

                    <div className="bg-white p-6 rounded mb-8">
                        <h2 className="text-2xl font-bold mb-4">
                            ที่อยู่จัดส่ง
                        </h2>
                        <p>{userData?.address}</p>
                    </div>

                    <div className="bg-white p-6 rounded mb-8">
                        <h2 className="text-2xl font-bold mb-4">
                            รายการสินค้า
                        </h2>

                        {elOverall}
                        <div className="border-t border-gray-300 pt-4 mt-4">
                            <h3 className="text-xl font-bold">
                                รวมราคา: {calculateTotalPrice(carts || 0)} THB
                            </h3>
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-8">
                        <button
                            className={`${
                                selectedPayment === "cash"
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                            } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
                            onClick={() => handlePaymentSelection("cash")}
                        >
                            เก็บเงินปลายทาง
                        </button>
                        <button
                            className={`${
                                selectedPayment === "qr"
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                            } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
                            onClick={() => handlePaymentSelection("qr")}
                        >
                            สแกนคิวอาร์
                        </button>
                    </div>

                    {selectedPayment === "qr" && qrCode && (
                        <QRCode value={qrCode} className="mb-8" />
                    )}

                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handlePlaceOrder}
                    >
                        สั่งซื้อ
                    </button>
                </div>
            </div>
        </Layout>
    );
}
