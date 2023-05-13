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
        await getOrder();
        setIsOpenPost(false);
        toast.success("บันทึกสำเร็จ");
    };

    const handlePutOpen = (id) => {
        setCurrentData(() => data.find((d) => d.id === id));
        setIsOpenPut(true);
    };

    const handlePutSubmit = async () => {
        await getOrder();
        setIsOpenPut(false);
        toast.success("บันทึกสำเร็จ");
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
                setData(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <Layout title="Orders">
            <Header title="Orders" onAdd={() => {}} />
            <ToastContainer />
            <Table data={data} onEdit={handlePutOpen} onDelete={handleDelete} />
        </Layout>
    );
}
