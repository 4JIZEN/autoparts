import Layout from "@/components/dashboard";
import Header from "@/components/dashboard/header";
import Table from "@/components/dashboard/table";
import Model from "@/components/dashboard/model";

import axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Promptpay() {
    const [data, setData] = useState([]);
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [isOpenPut, setIsOpenPut] = useState(false);
    const [currentData, setCurrentData] = useState(null);

    const handlePostSubmit = async () => {
        await getData();
        setIsOpenPost(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handlePutOpen = (id) => {
        setCurrentData(() => data.find((d) => d.id === id));
        setIsOpenPut(true);
    };

    const handlePutSubmit = async () => {
        await getData();
        setIsOpenPut(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handleDelete = async (id) => {
        if (confirm("ยืนยันการลบ?")) {
            try {
                const deleted = await axios.delete(`/api/promptpay?id=${id}`);
                if (deleted.status === 200) {
                    await getData();
                    toast.success("ลบสำเร็จ");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getData = async () => {
        await axios
            .get("/api/promptpay")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout title="พร้อมเพย์">
            <Header
                title="พร้อมเพย์"
                onAdd={data.length ? false : () => setIsOpenPost(true)}
            />
            <ToastContainer />
            <Table
                data={data}
                onWatch={false}
                onEdit={false}
                onDelete={handleDelete}
            />

            {/* Model Post */}
            <ModelPost
                isOpen={isOpenPost}
                onClose={() => setIsOpenPost(false)}
                onSubmit={handlePostSubmit}
            />
        </Layout>
    );
}

function ModelPost({ isOpen, onClose, onSubmit }) {
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const created = await axios.post("/api/promptpay", { phone });
            if (created.status === 200) {
                await onSubmit();
            }
        } catch (err) {
            console.error(err);
        }
        setPhone("");
    };

    const handleClose = () => {
        onClose();
        setPhone("");
    };

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">เพิ่มเบอร์พร้อมเพย์</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 font-bold">
                        เบอร์พร้อมเพย์
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required={true}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        เพิ่ม
                    </button>
                </div>
            </form>
        </Model>
    );
}
