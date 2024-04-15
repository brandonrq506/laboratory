import { useState, useEffect } from "react";
import { Button } from "@/components/core";

export const Online = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="mt-10 text-center">
      <Button disabled={!isOnline}>
        {isOnline ? "✅ Save" : "Reconnecting..."}
      </Button>
    </div>
  );
};
