import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Products({ categories, search }) {
    const [data, setData] = useState(null);
    const [elProduct, setElProduct] = useState(<></>);

    const getData = async () => {
        let dataFilter = [];

        await axios
            .get("/api/product")
            .then((response) => (dataFilter = response.data));

        if (categories !== null) {
            dataFilter = dataFilter.filter(
                (obj) => obj.category_id === categories
            );
        }

        if (!!search) {
            console.log(search);
            dataFilter = dataFilter.filter((obj) =>
                obj.title.toUpperCase().includes(search.toUpperCase())
            );
        }

        setData(dataFilter);
    };

    useEffect(() => {
        getData();
    }, [categories, search]);

    useEffect(() => {
        setElProduct(
            data?.map((product) => (
                <Link
                    key={product.id}
                    className="bg-white p-4 shadow rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg flex flex-col justify-between"
                    href={`/product/${product.id}`}
                >
                    <div>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-cover mb-2"
                        />
                        <h3 className="text-center font-semibold mb-1">
                            {product.title}
                        </h3>
                    </div>
                    <span className="text-gray-500 text-lg">
                        {product.price} THB
                    </span>
                </Link>
            ))
        );
    }, [data]);
    return (
        <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {elProduct}
        </div>
    );
}
