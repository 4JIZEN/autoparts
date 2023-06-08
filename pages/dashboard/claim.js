import Layout from "@/components/dashboard";
import Header from "@/components/dashboard/header";
import Table from "@/components/dashboard/table";
import Model from "@/components/dashboard/model";

import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Claim() {
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
        setCurrentData(id);
        setIsOpenPut(true);
    };

    const handlePutSubmit = async () => {
        await getData();
        setIsOpenPut(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handleDelete = async (id) => {
        if (confirm("confirm to delete?")) {
            try {
                const deleted = await axios.delete(`/api/claim?id=${id}`);
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
            .get("/api/claim")
            .then((response) => {
                setData(
                    response.data.map((obj) => {
                        const { message, created_at, updated_at, ...rest } =
                            obj;
                        return rest;
                    })
                );
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout title="Claim">
            <Header title="Claim" onAdd={() => setIsOpenPost(true)} />
            <ToastContainer />
            <Table
                data={data}
                onWatch={false}
                onEdit={handlePutOpen}
                onDelete={handleDelete}
            />

            {/* Model Post */}
            <ModelPost
                isOpen={isOpenPost}
                onClose={() => setIsOpenPost(false)}
                onSubmit={handlePostSubmit}
            />

            {/* Model Put */}
            <ModelPut
                isOpen={isOpenPut}
                data={currentData}
                onClose={() => setIsOpenPut(false)}
                onSubmit={handlePutSubmit}
            />
        </Layout>
    );
}

function ModelPost({ isOpen, onClose, onSubmit }) {
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
                onSubmit();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = () => {
        onClose();
        setFormState({
            name: "",
            email: "",
            product_name: "",
            order_no: "",
            message: "",
        });
    };

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">New Claim</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-4 mb-4">
                    <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formState.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
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
                            Product Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="product-name"
                            name="product_name"
                            type="text"
                            placeholder="Enter the product name"
                            value={formState.product_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="order-no"
                        >
                            Order No
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="order-no"
                            name="order_no"
                            type="text"
                            placeholder="Enter the order no"
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
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Enter your message"
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
                        Submit
                    </button>
                </div>
            </form>
        </Model>
    );
}

function ModelPut({ isOpen, data, onClose, onSubmit }) {
    const [formState, setFormState] = useState({
        id: "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await axios.put(`/api/claim?id=${formState.id}`, {
                name: formState.name,
                email: formState.email,
                product_name: formState.product_name,
                order_no: formState.order_no,
                message: formState.message,
            });
            if (updated.status === 200) {
                setFormState({
                    id: "",
                    name: "",
                    email: "",
                    product_name: "",
                    order_no: "",
                    message: "",
                });
                await onSubmit();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        const getData = async (id) => {
            await axios
                .get(`/api/claim?id=${id}`)
                .then((response) => {
                    setFormState({
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        product_name: response.data.product_name,
                        order_no: response.data.order_no,
                        message: response.data.message,
                    });
                })
                .catch((error) => console.error(error));
        };

        if (data) {
            getData(data);
        }
    }, [data]);

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">Edit Claim</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-4 mb-4">
                    <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formState.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
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
                            Product Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="product-name"
                            name="product_name"
                            type="text"
                            placeholder="Enter the product name"
                            value={formState.product_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="order-no"
                        >
                            Order No
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="order-no"
                            name="order_no"
                            type="text"
                            placeholder="Enter the order no"
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
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Enter your message"
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
                        Submit
                    </button>
                </div>
            </form>
        </Model>
    );
}
