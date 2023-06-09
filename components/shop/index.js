import Footer from "./footer";

export default function Layout({ children }) {
    return (
        <div className="w-screen h-screen mx-auto">
            {children}
            <Footer />
        </div>
    );
}
