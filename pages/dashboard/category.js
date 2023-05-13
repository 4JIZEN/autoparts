import Layout from "@/components/dashboard";
import Header from "@/components/dashboard/header";
import Table from "@/components/dashboard/table";
import Model from "@/components/dashboard/model";

import axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Category() {
    const [data, setData] = useState([]);
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [isOpenPut, setIsOpenPut] = useState(false);
    const [currentData, setCurrentData] = useState(null);

    const handlePostSubmit = async () => {
        await getCategory();
        setIsOpenPost(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handlePutOpen = (id) => {
        setCurrentData(() => data.find((d) => d.id === id));
        setIsOpenPut(true);
    };

    const handlePutSubmit = async () => {
        await getCategory();
        setIsOpenPut(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handleDelete = async (id) => {
        if (confirm("confirm to delete?")) {
            try {
                const deleted = await axios.delete(`/api/categories?id=${id}`);
                if (deleted.status === 200) {
                    await getCategory();
                    toast.success("ลบสำเร็จ");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getCategory = async () => {
        await axios
            .get("/api/categories")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <Layout title="Category">
            <Header title="Category" onAdd={() => setIsOpenPost(true)} />
            <ToastContainer />
            <Table data={data} onEdit={handlePutOpen} onDelete={handleDelete} />

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
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const created = await axios.post("/api/categories", { title });
            if (created.status === 200) {
                await onSubmit();
            }
        } catch (err) {
            console.error(err);
        }
        setTitle("");
    };

    const handleClose = () => {
        onClose();
        setTitle("");
    };

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">New Category</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Model>
    );
}

function ModelPut({ isOpen, data, onClose, onSubmit }) {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await axios.put(`/api/categories?id=${id}`, {
                title,
            });
            if (updated.status === 200) {
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
        setId(data?.id);
        setTitle(data?.title);
    }, [data]);

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">Edit Category</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 font-bold">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Model>
    );
}
