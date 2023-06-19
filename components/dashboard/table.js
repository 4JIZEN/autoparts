import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

function Table({ data, onWatch, onEdit, onDelete }) {
    const [tableHeader, setTableHeader] = useState(<></>);
    const [tableContent, setTableContent] = useState(<></>);

    useEffect(() => {
        if (data.length) {
            setTableHeader(() =>
                Object.keys(data[0]).map((title, key) => (
                    <th
                        key={key}
                        className="px-4 py-2 font-medium text-xs text-gray-500 uppercase"
                    >
                        {title}
                    </th>
                ))
            );

            setTableContent(() =>
                data.map((item, key) => (
                    <tr key={key} className="border-b border-gray-200">
                        {Object.values(item).map((value, k) => (
                            <td
                                key={k}
                                className="px-4 py-2 text-sm text-gray-500 text-center"
                            >
                                {value}
                            </td>
                        ))}

                        <td className="px-4 py-2 text-sm text-center">
                            <div className="flex items-center justify-center">
                                {onWatch && (
                                    <button
                                        className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none"
                                        onClick={() => onWatch(item.id)}
                                    >
                                        <FaEye className="h-5 w-5" />
                                    </button>
                                )}
                                {onEdit && (
                                    <button
                                        className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none"
                                        onClick={() => onEdit(item.id)}
                                    >
                                        <FaEdit className="h-5 w-5" />
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        className="ml-2 p-1 text-red-500 hover:text-red-600 focus:outline-none"
                                        onClick={() => onDelete(item.id)}
                                    >
                                        <FaTrashAlt className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                ))
            );
        }
    }, [data]);

    return (
        <div className="w-full overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-t border-b border-gray-200 bg-gray-50">
                            {tableHeader}
                            <th className="px-4 py-2 font-medium text-xs text-gray-500 uppercase">
                                การดำเนินการ
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">{tableContent}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
