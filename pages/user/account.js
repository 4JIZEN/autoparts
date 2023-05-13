import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountInfoForm() {
    const { data: session, status } = useSession();

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { id, ...update } = formData;
        fetch("/api/auth/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        }).then(async (res) => {
            console.log(res.status);
            if (res.status === 200) {
                toast.success("บันทึกสำเร็จ");
            } else {
                toast.error("เกิดข้อผิดพลาด");
            }
        });
    };

    const fetchData = async () => {
        await axios
            .get(`/api/user?email=${session?.user.email}`)
            .then((response) => {
                if (response?.data) {
                    setFormData(() => {
                        const { password, created_at, updated_at, ...rest } =
                            response.data;
                        return rest;
                    });
                }
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        fetchData();
    }, [session]);

    return (
        <Layout>
            <Navbar onSearchChange={() => {}} />
            <ToastContainer />
            <form
                className="w-full max-w-md mx-auto bg-white p-8 rounded"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4">ข้อมูลผู้ใช้</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label
                            htmlFor="firstname"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            ชื่อ
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastname"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            นามสกุล
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            อีเมล
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            เบอร์
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="col-span-2 mb-4">
                        <label
                            htmlFor="address"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            ที่อยู่
                        </label>
                        <textarea
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="col-span-2 mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            รห้สผ่าน
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    บันทึก
                </button>
            </form>
        </Layout>
    );
}
