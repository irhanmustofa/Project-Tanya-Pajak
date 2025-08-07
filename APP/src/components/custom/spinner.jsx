import { usePendingRequest } from "@/hooks/use-pending-request";

const LoaderData = ({ className = "" }) => {
  const { isPending, progress } = usePendingRequest();

  if (!isPending) return null;

  return (
    <div className="flex items-center gap-2">
      <svg
        className={`mx-2 animate-spin text-black dark:text-white ${className}`}
        width={30}
        height={30}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          className="opacity-85"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-sm text-neutral-600 dark:text-neutral-300">
        {progress}%
      </span>
    </div>
  );
};

export default LoaderData;
