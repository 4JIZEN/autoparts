import { useState } from "react";

export default function ImageUpload({ handleSetImage }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;

            image.onload = () => {
                const canvas = document.createElement("canvas");
                const maxWidth = 256;
                const scaleFactor = maxWidth / image.width;
                const newWidth = maxWidth;
                const newHeight = image.height * scaleFactor;

                canvas.width = newWidth;
                canvas.height = newHeight;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                const imageDataURL = canvas.toDataURL(file.type);
                setSelectedImage(imageDataURL);
                handleSetImage(imageDataURL);
                console.log(imageDataURL);
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">
                อัพโหลดสลิป
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border border-gray-300 px-4 py-2 rounded-md"
            />

            {selectedImage && (
                <div className="mt-4">
                    <h2 className="text-lg font-medium">รูปที่เลือก :</h2>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="mt-2 max-w-xs"
                    />
                </div>
            )}
        </div>
    );
}
