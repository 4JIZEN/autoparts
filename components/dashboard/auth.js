import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            admin: true,
        }).then(({ ok, error }) => {
            if (ok) {
                toast.success("เข้าสู่ระบบสำเร็จ");
                router.push("/dashboard");
            } else {
                toast.error("อีเมลหรือรห้สผ่านไม่ถูกต้อง");
            }
        });
    };

    return (
        <div className="my-[2%] flex flex-col items-center justify-center ">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-4">เข้าสู่ระบบ</h1>
            <form
                className="w-full max-w-sm bg-white p-8 rounded shadow"
                onSubmit={handleSubmit}
            >
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

                {/* Submit button */}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    เข้าสู่ระบบ
                </button>
            </form>
        </div>
    );
};

export default Auth;
