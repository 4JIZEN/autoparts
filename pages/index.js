import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";
import Category from "@/components/shop/category";
import Products from "@/components/shop/products";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
    const [elProduct, setElProduct] = useState(<></>);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(null);

    const handleCateChanged = (id) => {
        setCategory(id);
    };

    const handleSearchChanged = (data) => {
        setSearch(data);
    };

    useEffect(() => {
        setElProduct(<Products categories={category} search={search} />);
    }, [category, search]);

    return (
        <Layout>
            <Navbar onSearchChange={handleSearchChanged} />
            <Category onChange={handleCateChanged} />
            {elProduct}
        </Layout>
    );
}
