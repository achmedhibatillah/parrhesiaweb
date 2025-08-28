import React, { useState, useEffect } from "react";

export default function Timer({ createdAt }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!createdAt) return;

    const endTime = new Date(createdAt).getTime() + 5 * 60 * 1000; // 5 menit dari created_at

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((endTime - now) / 1000)); // dalam detik
      setTimeLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="bg-green-400 text-white font-bold text-shadow-2xs text-2xl text-center rounded">
      {minutes}:{seconds}
    </div>
  );
}
