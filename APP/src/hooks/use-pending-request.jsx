import { setHttpRequestTracking } from "@/api/http-request";
import { useEffect, useState, useContext, createContext } from "react";

const PendingRequestContext = createContext();
export const usePendingRequest = () => useContext(PendingRequestContext);

export const PendingRequestProvider = ({ children }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [finishedCount, setFinishedCount] = useState(0);

  useEffect(() => {
    setHttpRequestTracking({
      start: () => {
        setTotalCount((c) => c + 1);
      },
      end: () => {
        setFinishedCount((c) => c + 1);
      },
    });
  }, []);

  const pendingCount = totalCount - finishedCount;
  const isPending = pendingCount > 0;
  const progress =
    totalCount === 0
      ? 0
      : Math.min(100, Math.round((finishedCount / totalCount) * 100));

  useEffect(() => {
    if (totalCount > 0 && finishedCount >= totalCount) {
      const timeout = setTimeout(() => {
        setTotalCount(0);
        setFinishedCount(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [totalCount, finishedCount]);

  return (
    <PendingRequestContext.Provider value={{ isPending, progress }}>
      {children}
    </PendingRequestContext.Provider>
  );
};
