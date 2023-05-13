import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="absolute top-0 right-0 p-2">
                            <button
                                onClick={onClose}
                                className="bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FaTimes className="text-gray-400 hover:text-gray-500" />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
