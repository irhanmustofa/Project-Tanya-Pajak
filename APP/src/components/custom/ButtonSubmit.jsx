import React from "react";

export default function ButtonSubmit({
  disabled,
  loading,
  title,
  className = "",
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded dark:bg-gray-200 dark:text-gray-900 ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-gray-200 dark:text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      <span>{title}</span>
    </button>
  );
}
