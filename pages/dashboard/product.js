import Layout from "@/components/dashboard";
import Header from "@/components/dashboard/header";
import Table from "@/components/dashboard/table";
import Model from "@/components/dashboard/model";

import axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
    const [data, setData] = useState([]);
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [isOpenPut, setIsOpenPut] = useState(false);
    const [currentData, setCurrentData] = useState(null);

    const handlePostSubmit = async () => {
        await fetchData();
        setIsOpenPost(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handlePutOpen = (id) => {
        setCurrentData(id);
        setIsOpenPut(true);
    };

    const handlePutSubmit = async () => {
        await fetchData();
        setIsOpenPut(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handleDelete = async (id) => {
        if (confirm("confirm to delete?")) {
            try {
                const deleted = await axios.delete(`/api/product?id=${id}`);
                if (deleted.status === 200) {
                    await fetchData();
                    toast.success("ลบสำเร็จ");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const fetchData = async () => {
        await axios
            .get("/api/product")
            .then(async (response) => {
                const category = await axios
                    .get("/api/categories")
                    .then(async (res) => res.data);

                response.data = response.data.map((product) => {
                    const c = category.filter(
                        (c) => c.id === product.category_id
                    );
                    return { ...product, category: c[0].title };
                });

                return response;
            })
            .then((response) => {
                setData(
                    response.data.map((obj) => {
                        const {
                            image,
                            address,
                            category_id,
                            created_at,
                            updated_at,
                            ...rest
                        } = obj;
                        return rest;
                    })
                );
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout title="Product">
            <Header title="Product" onAdd={() => setIsOpenPost(true)} />
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
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [cateId, setCateId] = useState(null);

    const [category, setCategory] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const created = await axios.post("/api/product", {
                title,
                price,
                qty,
                description,
                image,
                category_id: cateId,
            });
            if (created.status === 200) {
                await onSubmit();
            }
        } catch (err) {
            console.error(err);
        }
        setTitle("");
        setPrice("");
        setQty("");
        setDescription("");
        setImage("");
        setCateId("");
    };

    const handleClose = () => {
        onClose();
        setTitle("");
        setPrice("");
        setQty("");
        setDescription("");
        setImage("");
        setCateId("");
    };

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get("/api/categories")
                .then((response) => {
                    setCategory(response.data);
                })
                .catch((error) => console.log(error));
        };

        fetchData();
    }, []);

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">New Product</h2>
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
                <div className="mb-5">
                    <label htmlFor="price" className="block mb-2 font-bold">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required={true}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="qty" className="block mb-2 font-bold">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="qty"
                        id="qty"
                        required={true}
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="block mb-2 font-bold"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        required={true}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 font-bold">
                        Image
                    </label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        required={true}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="category" className="block mb-2 font-bold">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        required={true}
                        value={cateId}
                        onChange={(e) => setCateId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    >
                        {category?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
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
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [cateId, setCateId] = useState(null);

    const [category, setCategory] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await axios.put(`/api/product?id=${id}`, {
                title,
                price,
                qty,
                description,
                image,
                category_id: cateId,
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
        const fetchData = async () => {
            await axios
                .get("/api/categories")
                .then((response) => {
                    setCategory(response.data);
                })
                .catch((error) => console.log(error));

            await axios
                .get(`/api/product?id=${data}`)
                .then((response) => {
                    setId(response.data[0].id);
                    setTitle(response.data[0].title);
                    setPrice(response.data[0].price);
                    setQty(response.data[0].qty);
                    setDescription(response.data[0].description);
                    setImage(response.data[0].image);
                    setCateId(response.data[0].category_id);
                })
                .catch((error) => console.log(error));
        };

        if (data) {
            fetchData();
        }
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
                <div className="mb-5">
                    <label htmlFor="price" className="block mb-2 font-bold">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required={true}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="qty" className="block mb-2 font-bold">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="qty"
                        id="qty"
                        required={true}
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="block mb-2 font-bold"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        required={true}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 font-bold">
                        Image
                    </label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        required={true}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="category" className="block mb-2 font-bold">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        required={true}
                        value={cateId}
                        onChange={(e) => setCateId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    >
                        {category?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
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
