import { useState, useEffect } from "react";

export const useLogoUpload = (formData, setFormData) => {
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [inputKey, setInputKey] = useState(0);

    // Effect untuk restore preview dari formData.logo
    useEffect(() => {
        if (formData.logo && formData.logo instanceof File) {
            const previewUrl = URL.createObjectURL(formData.logo);
            setPreview(previewUrl);

            return () => {
                if (previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                }
            };
        } else {
            setPreview("");
        }
    }, [formData.logo]);

    const loadImage = (event) => {
        const image = event.target.files[0];
        setFile(image);

        if (image) {
            setFormData((prev) => ({ ...prev, logo: image }));
        }
    };

    const cleanupPreview = () => {
        if (preview && preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }
    };

    const removePreview = () => {
        cleanupPreview();
        setPreview("");
        setFile("");
        setFormData((prev) => ({ ...prev, logo: null }));
        setInputKey((prev) => prev + 1);
    };

    return {
        file,
        preview,
        inputKey,
        loadImage,
        removePreview,
    };
};