import { useState, useEffect } from "react";
import axios from "axios";

export default function Category({ onChange }) {
    const [data, setData] = useState(null);

    const getData = async () => {
        await axios
            .get("/api/categories")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4">หมวดหมู่</h2>

                <ul className="flex space-x-4 overflow-x-auto">
                    <li
                        key={-1}
                        className="py-2 px-4 bg-white shadow rounded-lg whitespace-nowrap cursor-pointer transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
                        onClick={() => onChange(null)}
                    >
                        <span className="text-lg font-semibold">ทั้งหมด</span>
                    </li>
                    {data?.map((category, index) => (
                        <li
                            key={index}
                            className="py-2 px-4 bg-white shadow rounded-lg whitespace-nowrap cursor-pointer transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
                            onClick={() => onChange(category.id)}
                        >
                            <span className="text-lg font-semibold">
                                {category.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
