import Layout from "@/components/shop";
import Navbar from "@/components/shop/nav";
import Auth from "@/components/shop/auth";

export default function SignIn() {
    return (
        <Layout>
            <Navbar onSearchChange={() => {}} />
            <Auth />
        </Layout>
    );
}
