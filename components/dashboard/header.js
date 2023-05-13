import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

function Header({ title, onAdd }) {
    return (
        <header>
            <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                    {title}
                </h1>

                <form className="flex-1 ml-6">
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FiSearch className="h-5 w-5" />
                        </div>
                        <input
                            id="search"
                            className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-blue-500 sm:text-sm bg-gray-100"
                            type="search"
                            placeholder="Search"
                        />
                    </div>
                </form>

                <div className="ml-4 flex items-center md:ml-6">
                    <button
                        onClick={onAdd}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
                    >
                        <FaPlus className="h-5 w-5 mr-2 inline-block" />
                        Add
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
