import Link from "next/link";
export default function Home() {
    return (
        <div
            className="bg-cover bg-center h-screen flex flex-col items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://scontent.fbkk6-1.fna.fbcdn.net/v/t1.15752-9/355075704_216102781251974_7721809511888386706_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFA_yiC0CZ2Jkj5f0P6m1cunsoEcF0PNsqeygRwXQ82yqdM-Nc9oJtf0HIeR-hpIXtlksyDVo7bjgJ0Z_YUHE3G&_nc_ohc=M2_h_TQnZJwAX97OZ1m&_nc_ht=scontent.fbkk6-1.fna&oh=03_AdTrdqIC-BIY--l5s5l5bRpoPeJHHXh5YaruKvrj0VSJGg&oe=64B63375')",
            }}
        >
            <h1 className="text-4xl text-white font-bold mb-4">
                ร้านขายอะไหล่รถ
            </h1>
            <p className="text-white text-lg mb-8">
                ที่อยู่ร้าน 5/5 หมู่14 ตำบล ราชาเทวะ อำเภอบางพลี จังหวัด
                สมุทรปราการ
            </p>
            <div className="flex space-x-4">
                <Link href="/list">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        รายการสินค้า
                    </button>
                </Link>
            </div>
        </div>
    );
}
