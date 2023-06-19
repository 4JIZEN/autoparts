import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const router = useRouter();

    const handleSwitchMode = () => {
        setIsSignIn(!isSignIn);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission based on sign-in or sign-up mode

        if (isSignIn) {
            signIn("credentials", {
                redirect: false,
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            }).then(({ ok, error }) => {
                if (ok) {
                    toast.success("เข้าสู่ระบบสำเร็จ");
                    router.push("/list");
                } else {
                    toast.error("อีเมลหรือรห้สผ่านไม่ถูกต้อง");
                }
            });
        } else {
            fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: e.currentTarget.firstname.value,
                    lastname: e.currentTarget.lastname.value,
                    phone: e.currentTarget.phone.value,
                    address: e.currentTarget.address.value,
                    email: e.currentTarget.email.value,
                    password: e.currentTarget.password.value,
                }),
            }).then(async (res) => {
                if (res.status === 200) {
                    toast.success("สร้างบัญชีสำเร็จ");
                    setTimeout(() => {
                        setIsSignIn(!isSignIn);
                    }, 2000);
                } else {
                    toast.error("เกิดข้อผิดพลาด");
                }
            });
        }
    };

    return (
        <div className="my-[2%] flex flex-col items-center justify-center ">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-4">
                {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            <form
                className="w-full max-w-sm bg-white p-8 rounded shadow"
                onSubmit={handleSubmit}
            >
                {isSignIn ? (
                    <div>
                        {/* Sign In form fields */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                อีเมล
                            </label>
                            <input
                                type="email"
                                id="email"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                รห้สผ่าน
                            </label>
                            <input
                                type="password"
                                id="password"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Sign Up form fields */}
                        <div className="mb-4">
                            <label
                                htmlFor="firstname"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                ชื่อ
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="lastname"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                นามสกุล
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                อีเมล
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                เบอร์
                            </label>
                            <input
                                type="text"
                                id="phone"
                                phone="phone"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                ที่อยู่
                            </label>
                            <textarea
                                type="text"
                                id="address"
                                name="address"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                รห้สผ่าน
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required={true}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                            />
                        </div>
                    </div>
                )}

                {/* Submit button */}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    {isSignIn ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
                </button>

                {/* Switch button */}
                <p className="mt-4">
                    {isSignIn ? "ไม่มีบัญชี?" : "มีบัญชีอยู่แล้ว?"}
                    <button
                        className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
                        onClick={handleSwitchMode}
                    >
                        {isSignIn ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Auth;
