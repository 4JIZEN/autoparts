export default function Footer() {
    return (
        <footer className="py-4">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-600">
                    &copy; {new Date().getFullYear()} Autoparts. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
