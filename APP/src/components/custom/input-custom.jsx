import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const InputVertical = (props) => {
  const { title, name, type, placeholder, error = "" } = props;
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor={name}>{title}</Label>
        <Input
          id={name}
          title={title}
          name={name}
          type={type}
          placeholder={placeholder}
          {...props}
        />
        {error}
      </div>
    </>
  );
};

export const InputHorizontal = (props) => {
  const { title, name, type, placeholder, error = "" } = props;
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1 flex items-center">
          <Label htmlFor={name}>{title}</Label>
        </div>
        <div className="col-span-3">
          <Input
            id={name}
            title={title}
            name={name}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
      {error}
    </>
  );
};

export const InputFloating = (props) => {
  const { title, name, type, placeholder, error = "" } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="relative">
        <Input
          id={name}
          title={title}
          name={name}
          type={type}
          placeholder={placeholder}
          className="peer focus-visible:ring-1 focus-visible:ring-offset-0"
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
          {...props}
        />
        <Label
          htmlFor={name}
          className={`absolute left-2 top-2 transition-all duration-200 ease-in-out ${
            isFocused || props.value
              ? "text-xs -top-[1.1rem] z-10"
              : "text-sm font-thin text-transparent"
          }`}
        >
          {title}
        </Label>
      </div>
      {error}
    </>
  );
};

export const FileUploadInput = ({
  title,
  name,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxSize = 10, // MB
  value,
  onChange,
  error,
  className = "",
  required = false,
  disabled = false,
  multiple = false,
  showPreview = true,
  mode = "add", // New prop: "add" or "update"
  ...props
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Check if value is a File object or URL string
  const isFileObject = value instanceof File;
  const isFileUrl = typeof value === "string" && value.startsWith("http");

  const isImageFile = (fileOrUrl) => {
    if (fileOrUrl instanceof File) {
      return fileOrUrl.type && fileOrUrl.type.startsWith("image/");
    }
    if (typeof fileOrUrl === "string") {
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      return imageExtensions.some((ext) =>
        fileOrUrl.toLowerCase().includes(ext)
      );
    }
    return false;
  };

  const getFileName = (fileOrUrl) => {
    if (fileOrUrl instanceof File) {
      return fileOrUrl.name;
    }
    if (typeof fileOrUrl === "string") {
      // Extract filename from URL
      const urlParts = fileOrUrl.split("/");
      return urlParts[urlParts.length - 1] || "Existing File";
    }
    return "";
  };

  const getFileSize = (fileOrUrl) => {
    if (fileOrUrl instanceof File) {
      return (fileOrUrl.size / 1024 / 1024).toFixed(2);
    }
    return null; // Don't show size for existing files
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      if (onChange) {
        onChange({
          target: {
            name,
            files: null,
            value: null,
          },
          error: `File size exceeds ${maxSize}MB limit`,
        });
      }
      return;
    }

    // Create preview for image files
    if (isImageFile(selectedFile) && showPreview) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }

    if (onChange) {
      onChange({
        target: {
          name,
          files: [selectedFile],
          value: selectedFile,
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setPreviewUrl(null);
    if (onChange) {
      onChange({
        target: {
          name,
          files: null,
          value: null,
        },
      });
    }
    // Reset input value
    const input = document.getElementById(`file-${name}`);
    if (input) input.value = "";
  };

  const getFileTypeIcon = (fileName) => {
    const extension = fileName?.split(".").pop()?.toLowerCase();

    if (["pdf"].includes(extension)) {
      return (
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (["doc", "docx"].includes(extension)) {
      return (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return (
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  };

  return (
    <div className={`col-span-1 md:col-span-2 space-y-2 ${className}`}>
      <div className="border border-gray-300 rounded-md p-4 space-y-3">
        <Label
          htmlFor={`file-${name}`}
          className={`text-sm font-medium ${error ? "text-red-600" : ""}`}
        >
          {title} {required && <span className="text-red-500">*</span>}
        </Label>

        {/* Show existing file info first (for update mode) */}
        {mode === "update" && value && isFileUrl && (
          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center space-x-2">
              {getFileTypeIcon(getFileName(value))}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Current: {getFileName(value)}
                </p>
                <p className="text-xs text-gray-500">Existing file</p>
              </div>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove current file"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Upload area */}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={`file-${name}`}
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              disabled
                ? "bg-gray-100 cursor-not-allowed border-gray-200"
                : dragOver
                ? "border-blue-400 bg-blue-50"
                : error
                ? "border-red-300 bg-red-50 hover:bg-red-100"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className={`w-8 h-8 mb-4 ${
                  disabled
                    ? "text-gray-300"
                    : error
                    ? "text-red-400"
                    : "text-gray-500"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p
                className={`mb-2 text-sm ${
                  disabled ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="font-semibold">
                  {disabled
                    ? "Upload disabled"
                    : mode === "update" && isFileUrl
                    ? "Replace file"
                    : "Click to upload"}
                </span>{" "}
                {!disabled && "or drag and drop"}
              </p>
              <p
                className={`text-xs ${
                  disabled ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {accept.replace(/\./g, "").toUpperCase()} (MAX. {maxSize}MB)
              </p>
            </div>
            <input
              id={`file-${name}`}
              name={name}
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              onChange={handleInputChange}
              {...props}
            />
          </label>
        </div>

        {/* Image Preview for new uploads */}
        {previewUrl && isFileObject && (
          <div className="space-y-2">
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-48 rounded-lg border border-gray-200 shadow-sm object-contain"
              />
            </div>
          </div>
        )}

        {/* Image Preview for existing files (update mode, no new file selected) */}
        {mode === "update" &&
          isFileUrl &&
          isImageFile(value) &&
          showPreview &&
          !previewUrl && (
            <div className="space-y-2">
              <div className="relative inline-block">
                <span className="text-sm text-gray-500">
                  No new file selected. Current file is an image.
                </span>
              </div>
            </div>
          )}

        {/* Selected new file display (for newly uploaded files) */}
        {value && isFileObject && (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center space-x-2">
              {getFileTypeIcon(getFileName(value))}
              <div>
                <p className="text-sm font-medium text-green-900">
                  New: {getFileName(value)}
                </p>
                <p className="text-xs text-green-700">
                  {getFileSize(value)} MB
                </p>
              </div>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove new file"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 flex items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>
    </div>
  );
};
