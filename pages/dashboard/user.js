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
                const deleted = await axios.delete(`/api/user?id=${id}`);
                if (deleted.status === 200) {
                    await fetchData();
                    toast.success("ลบสำเร็จ");
                }
            } catch (err) {
                console.error(err);
                toast.error("เกิดข้อผิดพลาด");
            }
        }
    };

    const fetchData = async () => {
        await axios
            .get("/api/user")
            .then((response) => {
                setData(
                    response.data.map((obj) => {
                        const {
                            password,
                            address,
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
        <Layout title="User">
            <Header title="User" onAdd={() => {}} />
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
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const created = await axios.post("/api/user", {
                firstname,
                lastname,
                email,
                phone,
                address,
                password,
            });
            if (created.status === 200) {
                await onSubmit();
            }
        } catch (err) {
            console.error(err);
        }
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");
    };

    const handleClose = () => {
        onClose();
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");
    };

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">New User</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
                <div className="mb-5">
                    <label htmlFor="firstname" className="block mb-2 font-bold">
                        Firstname
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        required={true}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastname" className="block mb-2 font-bold">
                        Lastname
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        required={true}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 font-bold">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        required={true}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 font-bold">
                        Address
                    </label>
                    <textarea
                        type="text"
                        name="address"
                        id="address"
                        required={true}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 font-bold">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        value={phone}
                        onChange={(e) => setPassword(e.target.value)}
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
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await axios.put(`/api/user?id=${id}`, {
                firstname,
                lastname,
                email,
                phone,
                address,
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
        const getData = async () => {
            const user = await axios
                .get(`/api/user?id=${data}`)
                .then((response) => {
                    setId(response.data.id);
                    setFirstname(response.data.firstname);
                    setLastname(response.data.lastname);
                    setEmail(response.data.email);
                    setPhone(response.data.phone);
                    setAddress(response.data.address);
                })
                .catch((error) => console.log(error));
            return user;
        };
        if (data) {
            getData();
        }
    }, [data]);

    return (
        <Model isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-lg font-medium mb-4">Edit Category</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
                <div className="mb-5">
                    <label htmlFor="firstname" className="block mb-2 font-bold">
                        Firstname
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        required={true}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastname" className="block mb-2 font-bold">
                        Lastname
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        required={true}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 font-bold">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        required={true}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 font-bold">
                        Address
                    </label>
                    <textarea
                        type="text"
                        name="address"
                        id="address"
                        required={true}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
