import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";

import { useState } from "react";
import axios from "axios";

export default function Claim() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        product_name: "",
        order_no: "",
        message: "",
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const created = await axios.post("/api/claim", formState);
            if (created.status === 200) {
                setFormState({
                    name: "",
                    email: "",
                    product_name: "",
                    order_no: "",
                    message: "",
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <Navbar onSearchChange={() => {}} />
            <div className="w-full mx-auto my-8 px-4 sm:px-6 lg:px-8">
                <form
                    className="bg-white rounded-lg shadow-lg px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold mb-6">ฟอร์มเคลมสินค้า</h2>
                    <div className="flex flex-wrap -mx-4 mb-4">
                        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="name"
                            >
                                ชื่อ
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                name="name"
                                type="text"
                                value={formState.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="email"
                            >
                                อีเมล
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4 mb-4">
                        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="product-name"
                            >
                                ชื่อสินค้า
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="product-name"
                                name="product_name"
                                type="text"
                                value={formState.product_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="order-no"
                            >
                                หมายเลขการสั่งซื้อ
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="order-no"
                                name="order_no"
                                type="text"
                                value={formState.order_no}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4 mb-4">
                        <div className="w-full px-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="message"
                            >
                                รายละเอียด
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                name="message"
                                rows="5"
                                value={formState.message}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            ส่ง
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
