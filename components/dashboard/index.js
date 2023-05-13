import Sidebar from "./sidebar";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen md:flex-row">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 py-4 md:px-6 lg:px-10 xl:px-12">
                    {/* Main content */}
                    {children}
                </div>
            </div>
        </div>
    );
}
